export const createHTML = partialHTML => {
  return `
  <!DOCTYPE html>
  <html lang="tr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap" rel="stylesheet">
    <style>
      * {
        color: #484848;
        font-family: "Poppins";
      }
    </style>
  </head>
  <body>
    ${partialHTML}
  </body>
  </html>
  `;
};
