const ShowDocumentUploadFormButton = document.querySelector("#document_radio");
const ShowPaperUploadFormButton = document.querySelector("#paper_radio");
const PaperUploadForm = document.querySelector("form#paper");
const PaperUpload = PaperUploadForm.querySelector('input[type="file"]');
const DocumentUploadForm = document.querySelector("form#document");
const DocumentUpload = DocumentUploadForm.querySelector('input[type="file"]');
// const WordUploadForm = document.querySelector('form#word')
// const WordUpload = WordUploadForm.querySelector('input[type="file"]')
const PreviewWindowEmbed = document
  .querySelector("#preview-window")
  .querySelector("embed");
const Dialog = document.querySelector("dialog#result");

ShowDocumentUploadFormButton.addEventListener("click", () => {
  ShowPaperUploadFormButton.checked = false;
  Dialog.classList.add("hidden");
  DocumentUploadForm.classList.remove("hidden");
  PaperUploadForm.classList.add("hidden");
});

ShowPaperUploadFormButton.addEventListener("click", () => {
  ShowDocumentUploadFormButton.checked = false;
  Dialog.classList.add("hidden");
  PaperUploadForm.classList.remove("hidden");
  DocumentUploadForm.classList.add("hidden");
});

DocumentUploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;

  if (!form.document_file.files[0]) {
    return;
  }

  const formData = new FormData();
  formData.append("file", form.document_file.files[0]);

  let response = await fetch("/upload_doc", {
    method: "POST",
    body: formData,
  });

  let json = await response.json();

  console.log(json);

  Dialog.classList.remove("hidden");
  Dialog.textContent =
    "Conversion used time: " +
    json.conversion_time + " ms" +
    "\r\n\r\nConversion result: \r\n" +
    json.converted_file;
});

PaperUploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;

  if (!form.paper_file.files[0]) {
    return;
  }

  const formData = new FormData();
  formData.append("file", form.paper_file.files[0]);

  let response = await fetch("/upload_paper", {
    method: "POST",
    body: formData,
  });

  let json = await response.json();

  console.log(json);

  Dialog.classList.remove("hidden");
  Dialog.textContent =
    "Conversion used time: " +
    json.conversion_time + " ms" +
    "\r\n\r\nConversion result: \r\n" +
    json.converted_file;
});

// WordUploadForm.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   console.log(1);
//   const form = event.target;

//   if (!form.word_file.files[0]) {
//     return;
//   }

//   const formData = new FormData();
//   formData.append("file", form.word_file.files[0]);

//   let response = await fetch("/upload_word", {
//     method: "POST",
//     body: formData,
//   });

//   let json = await response.json();

//   console.log(json);

//   Dialog.classList.remove("hidden");
//   Dialog.textContent =
//     "Conversion used time: " +
//     json.conversion_time + " ms" +
//     "\r\n\r\nConversion result: \r\n" +
//     json.converted_file;
// });

DocumentUpload.addEventListener("change", (event) => {
  const [file] = event.target.files;
  Dialog.classList.add("hidden");

  PreviewWindowEmbed.src = URL.createObjectURL(file);
});

PaperUploadForm.addEventListener("change", (event) => {
  const [file] = event.target.files;
  Dialog.classList.add("hidden");

  PreviewWindowEmbed.src = URL.createObjectURL(file);
});

ShowDocumentUploadFormButton.checked = true;
PaperUploadForm.classList.add("hidden");
Dialog.classList.add("hidden");
