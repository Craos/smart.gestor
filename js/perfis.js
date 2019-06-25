class AdmProfile extends UsuariosProfile {

    constructor(container) {

        super();

        this.container = container;

        this.MontaLayout();
        this.MontaBarraSuperior();
        this.MontaLista();

        this.ListaRegistros(this.list);

        addEventListener('AoAdicionar', function () {
            this.ListaRegistros(this.list);
        }.bind(this), false);

        addEventListener('AoAtualizar', function () {
            this.ListaRegistros(this.list);
        }.bind(this), false);

        addEventListener('AoRemover', function () {
            this.ListaRegistros(this.list);
        }.bind(this), false);


    }

    MontaLayout() {

        this.layout = this.container.attachLayout({
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

        this.formEditProfile(null, this.layout.cells('b'));

    }

    MontaBarraSuperior() {

        this.container.attachToolbar({
            icon_path: 'img/toolbar/',
            items:[
                {type: 'button', id: 'atualizar', img: 'atualizar.png', text: 'Atualizar'},
                {type: 'button', id: 'novo', img: 'novo.png', text: 'Novo'},
                {type: 'button', id: 'salvar', img: 'salvar.png', text: 'Salvar'},
                {type: 'button', id: 'remover', img: 'removerperfil.png', text: 'Remover'}
            ]
        }).attachEvent("onClick", function (id) {

            let data = this.form.getFormData();

            switch (id) {
                case 'atualizar':
                    this.ListaRegistros(this.list);
                    break;

                case 'novo':
                    this.formEditProfile(null, this.layout.cells('b'));
                    break;

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

    MontaLista() {

        this.list = this.layout.cells('a').attachList({
            container: "data_container",
            type: {
                template: "http->./html/listprofiles.html",
                height: 'auto'
            }
        });

        this.list.attachEvent("onItemClick", function (id) {
            this.formEditProfile(id, this.layout.cells('b'));
            return true;
        }.bind(this))

    }

}