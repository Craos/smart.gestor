class AdmUsers extends Usuarios {

    constructor(container) {

        super();

        this.MontaLayout(container);
        this.MontaLista();
        this.MontaTabbar();
        this.MontaBarraSuperior();
        this.MontaBarraInferior();
        this.MontaGrid();

        this.listNavUsers(this.list);

        addEventListener('AoAdicionar', function () {
            this.listNavUsers(this.list);
        }.bind(this), false);

        addEventListener('AoAtualizar', function () {
            this.listNavUsers(this.list);
        }.bind(this), false);

        addEventListener('AoRemover', function () {
            this.listNavUsers(this.list);
        }.bind(this), false);


    }

    MontaLayout(container) {

        this.layout = container.attachLayout({
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

    MontaLista() {

        this.list = this.layout.cells('a').attachList({
            container: "data_container",
            type: {
                template: "http->./html/listusers.html",
                height: 'auto'
            }
        });

        this.list.attachEvent("onItemClick", function (id) {
            this.formEditUser(id, this.tabbar.cells('forminfo'));
            this.gridHistoricodeAcesso(id, this.grid);
            return true;
        }.bind(this))

    }

    MontaTabbar() {

        this.tabbar = this.layout.cells('b').attachTabbar({
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

        this.formEditUser(null, this.tabbar.cells('forminfo'));

    }

    MontaBarraSuperior() {

        this.layout.cells('a').attachToolbar({
            icon_path: 'img/toolbar/',
            items:[
                {type: 'button', id: 'atualizar', img: 'atualizar.png', text: 'Atualizar'},
                {type: 'button', id: 'novo', img: 'adicionar.png', text: 'Adicionar'},
            ]
        }).attachEvent("onClick", function (id) {

            switch (id) {
                case 'atualizar':
                    this.listNavUsers(this.list);
                    break;

                case 'novo':
                    this.grid.clearAll();
                    this.tabbar.tabs('forminfo').setActive();
                    this.formEditUser(null, this.tabbar.cells('forminfo'));
                    break;

                default:
                    break;
            }

        }.bind(this));

    }

    MontaBarraInferior() {

        this.tabbar.cells('forminfo').attachToolbar({
            icon_path: 'img/toolbar/',
            items:[
                {type: 'button', id: 'salvar', img: 'confirmar.png', text: 'Salvar'},
                {type: 'button', id: 'remover', img: 'remover.png', text: 'Remover'}
            ]
        }).attachEvent("onClick", function (id) {

            let data = this.form.getFormData();
            switch (id) {

                case 'salvar':
                    if (data.id.length === 0) {
                        delete data.id;
                        this.Adicionar(data);
                    } else {
                        this.Atualizar({data:data, filter:{id:data.id}});
                    }
                    break;

                case 'remover':
                    this.Remover({filter:{id:data.id}});
                    break;

                default:
                    break;
            }

        }.bind(this));

    }

    MontaGrid() {

        this.grid = this.tabbar.cells('hist').attachGrid();
        this.grid.setImagePath("./codebase/imgs/");
        this.grid.setHeader("Data,Acesso,Sistema,Usuário");
        this.grid.setColumnIds("filedate,acesso_id,client_id,user_id");
        this.grid.setColTypes("ro,ro,ro,ro");
        this.grid.setColSorting("str,str");
        this.grid.enableAutoWidth(true);
        this.grid.init();

    }

}