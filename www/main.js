function question(move) {
    document.location = move;
}

let apikey = "xxx";

function backForm() {
    history.back();
}

function save() {
    let radioCon = document.getElementById("FormID");
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let contents = document.getElementById("contents").value;

    if (radioCon.group.value == "" || name == "" || address == "" || contents == "") {
        alert("全ての項目を入力して。");
        return;
    }

    let url = `https://db.monaca.education/v1/insert?apikey=${apikey}&int1=${radioCon.group.value}&text1=${name}&text2=${address}&text3=${contents}`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            alert("お問い合わせ内容を送信しました。");
            backForm();
        });




}

function load() {
    let url = `https://db.monaca.education/v1/select?apikey=${apikey}`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (results) {
            console.log(results);

            for (let i = 0; i < results.totalCount; i++) {

                let frame = document.createElement("div");
                let name = document.createElement("div");
                let address = document.createElement("div");
                let contents = document.createElement("div");
                let date = document.createElement("div");
                let radio = document.createElement("div");

                frame.className = "memo";
                contents.className = "contents";
                name.className = "name";
                // address.className = "address";
                // date.className = "date";
                // radio.className = "class";

                let d = new Date(results.records[i].created * 1000);

                name.innerText = `Name：${results.records[i].text1}`;
                address.innerText = `Address：${results.records[i].text2}`;
                contents.innerText = `${results.records[i].text3}`;
                date.innerText = `　登録日：${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

                if (results.records[i].int1 == 1) {
                    radio.innerText = "商品";
                    radio.className = "jud1";
                }
                else if (results.records[i].int1 == 2) {
                    radio.innerText = "販売店";
                    radio.className = "jud2";
                }
                else if (results.records[i].int1 == 3) {
                    radio.innerText = "その他";
                    radio.className = "jud3";
                }
                frame.appendChild(radio);
                frame.appendChild(date);
                frame.appendChild(name);
                frame.appendChild(address);
                frame.appendChild(contents);

                let display = document.getElementById("display");
                display.appendChild(frame);

            }

        });

}
