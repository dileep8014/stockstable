var store = {
    fromDate: null,
    toDate: null
};

var stocks = [];
stocks.push({
    name: "Microsoft",
    symbol: "MSFT",
    price: "$100.80" ,
    avg_price: "$80.07",
    volume: "1.75B",
    change: "1.61%",
    week: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    month: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    year: {
        price: "$102.44(-1.60%)",
        loss: true
    }
});
stocks.push({
    name: "Twitter",
    symbol: "TWTR",
    price: "$43.54",
    avg_price: "$80.07",
    volume: "1.75B",
    change: "1.61%",
    week: {
        price: "$39.51(10.51%)",
        loss: false
    },
    month: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    year: {
        price: "$102.44(-1.60%)",
        loss: true
    }
});
stocks.push({
    name: "Trip Advisor",
    symbol: "TRIP",
    volume: "1.75B",
    price: "$58.49",
    avg_price: "$80.07",
    change: "1.61%",
    week: {
        price: "$57.53(1.41%)",
        loss: false
    },
    month: {
        price: "$48.67(18.97%)",
        loss: false
    },
    year: {
        price: "$37.81(56.17%)",
        loss: false
    }
});
stocks.push({
    name: "Apache",
    symbol: "APA",
    price: "$43.08",
    volume: "1.75B",
    change: "1.61%",
    week: {
        price: "$39.77(0.40%)",
        loss: false
    },
    month: {
        price: "$42.31(1.44%)",
        loss: false
    },
    year: {
        price: "$47.34(-9.91%)",
        loss: true
    }
});
stocks.push({
    name: "Expedia",
    symbol: "EXPE",
    price: "$123.64",
    avg_price: "$80.07",
    volume: "1.75B",
    change: "1.61%",
    week: {
        price: "$120.11(3.08%)",
        loss: false
    },
    month: {
        price: "$114.34(9.27%)",
        loss: false
    },
    year: {
        price: "$142.86(-11.61%)",
        loss: true
    }
});
stocks.push({
    name: "Fitbit",
    symbol: "FIT",
    price: "$7.72",
    volume: "1.75B",
    change: "1.61%",
    avg_price: "$80.07",
    week: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    month: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    year: {
        price: "$102.44(-1.60%)",
        loss: true
    }
});
stocks.push({
    name: "Facebook",
    symbol: "FB",
    price: "$193.05",
    volume: "1.75B",
    change: "1.61%",
    week: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    month: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    year: 748
});
stocks.push({
    name: "Zillow",
    symbol: "Z",
    price: "$64.79",
    volume: "1.75B",
    change: "1.61%",
    avg_price: "$80.07",
    week: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    month: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    year: {
        price: "$102.44(-1.60%)",
        loss: true
    }
});
stocks.push({
    name: "Amazon",
    symbol: "AMZN",
    price: "1696.08",
    volume: "1.75B",
    change: "1.61%",
    avg_price: "$80.07",
    week: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    month: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    year: {
        price: "$102.44(-1.60%)",
        loss: true
    }
});
stocks.push({
    name: "Bank Of America",
    symbol: "BAC",
    volume: "1.75B",
    avg_price: "$80.07",
    change: "1.61%",
    price: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    week: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    month: {
        price: "$102.44(-1.60%)",
        loss: true
    },
    year: {
        price: "$102.44(-1.60%)",
        loss: true
    }
});

const iconUp = "<span class='profit'><i class=\"fas fa-angle-up\"></i></span>";
const iconDown = "<span class='loss'><i class=\"fas fa-angle-down\"></i></span>";

const headers = {
    name: 'Name',
    symbol: 'Symbol',
    price: 'Price',
    week: '7 Days %',
    month: '30 Days %',
    year: '1 Year %'
}

store.headers = headers;
store.stocks = stocks;



var el = document.getElementById('table_data');

$( function() {
    var dateFormat = "mm/dd/yy",
        from = $( "#from" )
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 2,
                maxDate: new Date()
            })
            .on( "change", function() {
                store.fromDate = getDate( this );
                to.datepicker( "option", "minDate", getDate( this ) );
            }),
        to = $( "#to" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 2,
            maxDate: new Date()
        })
            .on( "change", function() {
                store.toDate = getDate( this );
                from.datepicker( "option", "maxDate", getDate( this ) );
            });
    
    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }
        
        return date;
    }
} );

function loader() {
    return (
        '<div id="loader"></div>'
    )
}

//just showing few rows and columns
function onFilter() {
    
    if(store.fromDate === null || store.toDate === null) {
        return;
    }
    
    el.innerHTML = loader();
    
    store.headers = {
        name: 'Name',
        symbol: 'Symbol',
        avg_price: 'Avg Price',
        volume: 'volume',
        change: 'change %'
    }
    
    setTimeout(function() {
        el.innerHTML = null;
        document.getElementById('filter-message').innerHTML = _filters();
        _renderStocks()
    }, 1000)
    
    
    
}

function _filters() {
    return '<div class="clear-filters"> showing 10 records from ' + store.fromDate.toLocaleDateString("en-US") + ' to ' +  store.toDate.toLocaleDateString("en-US")  + ' <i class="fas fa-trash-alt" onclick="_closeFilters()"></i></div>'
}

function _closeFilters() {
    
    store.fromDate = null;
    store.toDate = null;
    
    document.getElementById('to').value = null;
    document.getElementById('from').value = null
    
    document.getElementById('filter-message').innerHTML = null;
    
    store.headers = headers;
    _renderStocks();
}

function loadHeader() {
    var headersHtml = '';
    
    Object.values(store.headers).forEach(function(header) {
        headersHtml += '<th>'+ header +'</th>';
    });
    
    el.innerHTML = '<tr>'+ headersHtml + '</tr>';
}

function listStocks(item, index) {
    
    var row = '<tr>'
    Object.keys(store.headers).forEach(function(key, i) {
        
        if(typeof item[key] === 'object') {
            
            var val = item[key];
            var icon = '';
            if(val.loss) {
                icon = iconDown;
            } else {
                icon = iconUp;
            }
            row += "<td>" + icon + item[key].price + "</td>";
        } else {
            row += "<td>" + item[key] + "</td>";
        }
        
    })
    
    row += '</tr>';
    el.innerHTML += row;
}

function _renderStocks() {
    loadHeader()
    store.stocks.forEach(listStocks);
}

(function() {
    
    _renderStocks()
})()