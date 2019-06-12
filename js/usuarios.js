let UsuarioUI = function (container) {

    let layout, list, form, grid, tabbar, currentuser, usuario = Usuario;

    function MontaLayoutPrincipal() {

        layout = container.attachLayout({
            pattern: '2U',
            offsets: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            cells: [
                {
                    id: 'a',
                    width: 280,
                    header: false,
                },
                {
                    id: 'b',
                    header: false,
                }
            ]
        });

    }

    function MontaLista() {

        list = layout.cells('a').attachList({
            container: "data_container",
            type: {
                template: "http->./html/listusers.html",
                height: 'auto'
            }
        });

    }

    function MontaTabbar() {

        tabbar = layout.cells('b').attachTabbar({
            mode: "top",
            align: "left",
            close_button: false,
            content_zone: true,
            tabs: [
                {
                    id: 'forminfo',
                    text: 'Perfil',
                    index: 0,
                    active: true,
                    enabled: true
                },
                {
                    id: 'hist',
                    text: 'Acessos',
                    index: 1,
                    enabled: true
                },
            ]
        });

    }

    function MontaForm(data) {

        form = tabbar.cells('forminfo').attachForm([
            {type:'input', label:'Id:', name:'id'},
            {type:'input', label:'Usuario:', name:'username'},
            {type:'input', label:'Nome:', name:'first_name'},
            {type:'input', label:'Sobrenome:', name:'last_name'},
        ]);

        if (data)
            form.setFormData(data);

    }

    function MontaGrid() {

        grid = tabbar.cells('hist').attachGrid();
        grid.setImagePath("./codebase/imgs/");
        grid.setHeader("Data,Acesso,Sistema,Usuário");
        grid.setColumnIds("filedate,id,client_id,user_id");
        grid.setInitWidths("100,100");
        grid.setColAlign("right,left");
        grid.setColTypes("ro,ro,ro,ro");
        grid.setColSorting("str,str");
        grid.enableAutoWidth(true);
        grid.init();

    }

    function CarregaLista() {

        usuario.Listar(function (data) {

            list.parse(data._embedded.list_users, 'json');

            list.attachEvent("onItemClick", function (id) {

                currentuser = id;
                usuario.Obter(id, function (data) {

                    if (data)
                        form.setFormData(data);

                    usuario.HistoricoAcesso(currentuser, function (data) {
                        grid.clearAll();

                        if (!data)
                            return;

                        data._embedded.list_access.filter(function (item) {
                            grid.addRow(item.id,[item.filedate, item.id, item.title, item.user_id]);
                        });

                    });
                });
                return true;

            });

        });

    }

    MontaLayoutPrincipal();
    MontaLista();
    MontaTabbar();
    MontaForm();
    MontaGrid();
    CarregaLista();

};

