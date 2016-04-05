var getLista = function () {
    var url = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getByTitle('Personas')/items";
        //?$filter=Nombre eq 'Luis' and edad lt 40";
    $.ajax({
        url: url,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function (res) {
            var html = "<ul>";
            $.each(res.d.results, function (i, result) {
                html += "<li>" + result.Nombre + " " + result.Edad + "</li>";
            });
            html += "</ul>";
            $("#lista").html(html);

        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });

}