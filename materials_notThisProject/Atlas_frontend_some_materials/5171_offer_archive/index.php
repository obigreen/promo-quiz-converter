<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    body {
        font-family: Arial, sans-serif;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
    }

    .params-container {
        margin-top: 20px;
        padding: 15px;
        background-color: #f8f8f8;
        border-radius: 5px;
        border: 1px solid #ddd;
    }

    .params-container h2 {
        margin-top: 0;
        color: #333;
    }

    .param {
        margin: 10px 0;
        padding: 10px;
        background-color: white;
        border-left: 3px solid #007bff;
        word-break: break-all;
    }

    .param-key {
        font-weight: bold;
        color: #007bff;
        margin-right: 4px;
    }

    .param.error {
        border-left: 3px solid #aa0000;
    }

    .no-params-error {
        color: #aa0000;
        font-style: italic;
    }

    .image-with-caption {
        display: block;
        text-align: center;
    }

    .image-with-caption img {
        display: block;
        max-width: 100%;
        height: auto;
    }

    .image-with-caption .caption {
        font-size: 14px;
        color: #555;
        margin-top: 5px;
    }

    .images {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
</style>

<body>
    <div class="params-container">

    </div>
</body>
<script>
    const PARAM_LABELS = {
        "sub_id_27": "Email",
        "sub_id_24": "Имя",
        "sub_id_25": "Фамилия",
        "sub_id_22": "Адрес",
        "sub_id_9": "Штат",
        "sub_id_23": "Post/Zip code",
        "sub_id_21": "Город",
        "sub_id_26": "Телефон",
        "sub_id_15": "Product Img",
        "sub_id_17": "Logo Img",
    };
    const REQUIRED_PARAMS = [
        "sub_id_27",
        "sub_id_24",
        "sub_id_25",
        "sub_id_22",
        "sub_id_9",
        "sub_id_23",
        "sub_id_21",
        "sub_id_26",
    ];
    const IMAGE_PARAMS = ["sub_id_15", "sub_id_17"];
    const container = document.querySelector(".params-container");
    const params = new URLSearchParams(window.location.search);

    function renderParam(key, value, isError) {
        value = value ?? "-"
        const label = PARAM_LABELS[key]
            ? `${PARAM_LABELS[key]} (${key})`
            : key;
        const div = document.createElement("div");
        div.className = "param";
        if (isError) {
            div.classList.add("error")
        }
        div.innerHTML = `<span class="param-key">${label}:</span><span class="param-value">${value}</span>`;
        container.appendChild(div);
    }

    // проверка обязательных
    const notFoundParams = []
    for (const key of REQUIRED_PARAMS) {
        if (!params.has(key)) {
            notFoundParams.push(PARAM_LABELS[key] ?? key)
        }
    }
    if (notFoundParams.length != 0) {
        const p = document.createElement("p");
        p.className = "no-params-error";
        p.textContent = `Ошибка: не хватает ${notFoundParams.join(", ")}`;
        container.append(p);
    }


    // рендер обязательных
    REQUIRED_PARAMS.forEach((key) => {
        var value = params.get(key)
        var isError = value == null;
        renderParam(key, value, isError);
    });

    // рендер остальных
    params.forEach((value, key) => {
        if (REQUIRED_PARAMS.includes(key)) return;
        renderParam(key, value);
    });

    // render images
    const imagesContainer = document.createElement("div")
    imagesContainer.classList.add("images")
    container.append(imagesContainer)
    IMAGE_PARAMS.forEach((key) => {
        const value = params.get(key);
        console.log(value, key)
        if (!value) return;

        const div = document.createElement("div");
        div.className = "image-with-caption";
        var label = PARAM_LABELS[key] ?? key;
        div.innerHTML = `
    <img src="${value}" alt="${label}">
    <div class="caption">${label}</div>
  `;

        imagesContainer.appendChild(div);
    });
</script>

</html>