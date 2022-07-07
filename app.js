document.addEventListener('DOMContentLoaded', () => {
    $.get("https://api.coinstats.app/public/v1/coins/", (coinPrices) => {
        console.log(coinPrices);
        let priceArr = [];
        let idArr = [];
        for (let i = 0; i <= 30; i++) {
            let eachPrice = Math.round((coinPrices.coins[i].price + Number.EPSILON) * 10000) / 10000
            let coinId = coinPrices.coins[i].name;
            priceArr.push(eachPrice);
            idArr.push(coinId);
        }

    Highcharts.chart('container', {
        chart : {
            zoomType : 'x'
        },
        title : {
            text : "Daniel's Chart"
        },
        yAxis : {
            title : {
                text : "US Dollar"
            }
        },
        xAxis : {
            categories : idArr
        },
        series : [{
            data : priceArr,
            name : '$'
        }]
    })
})
});


const container2 = document.getElementById('container2')
const searchCoinId = document.getElementById('searchCoinId');
const searchCoinPrice = document.getElementById('searchCoinPrice');
container2.append(searchCoinId);
container2.append(searchCoinPrice);


const searchInput = document.getElementById('search');
const submitBtn = document.getElementById('submit');
const hyperLink = document.getElementById('hyperLink');

submitBtn.addEventListener('click', () => {
    const searchVal = searchInput.value.toLowerCase();
    console.log(searchVal);

    $.get("https://api.coinstats.app/public/v1/coins/", (searchData) => {
        let idArr = [];
        for (let i = 0; i <= 30; i++) {
            let coinDataId = searchData.coins[i].id;
            idArr.push(coinDataId);
        }
        idArr.indexOf(searchVal);

        searchCoinId.innerText = searchInput.value.toUpperCase();
        searchCoinPrice.innerText = `$${Math.round((searchData.coins[idArr.indexOf(searchVal)].price + Number.EPSILON) * 10000) / 10000}`;

        console.log(searchData.coins[idArr.indexOf(searchVal)].websiteUrl)

        hyperLink.setAttribute('href', searchData.coins[idArr.indexOf(searchVal)].websiteUrl); 
        hyperLink.textContent = `${searchCoinId.innerText} informations!`
    })
})