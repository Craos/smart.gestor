/**
 * Created by oberd on 21/07/2017.
 */

dhtmlxEvent(window, 'load', function () {

    if (!sessionStorage.auth) {

        sessionStorage.credentials = JSON.stringify({
            client_id: 'OEUh02c5D7x3BE'
        });

        window.location = '../smart.auth';
        return;
    }

    let that = this, siderbar;

    siderbar = new dhtmlXSideBar({
        parent: document.body,
        template: 'icons',
        icons_path: 'img/siderbar/',
        single_cell: false,
        width: 50,
        header: true,
        autohide: false,
        offsets: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        items: [
            {
                id: 'usuarios',
                text: 'Contas de usuários',
                icon: 'autorizacao.png',
                selected: true
            },
            {
                id: 'perfis',
                text: 'Perfis de acesso',
                icon: 'autorizacao.png',
                selected: false
            }
        ]

    });

    siderbar.attachEvent('onSelect', function(id) {
        that.SelecionarOpcao(id);
    });

    this.SelecionarOpcao = function(id) {

        let cell = siderbar.cells(id);

        switch (id) {
            case 'usuarios':
                new AdmUsers(cell);
                break;

            case 'perfis':
                new Perfis(cell);
                break;
        }

    };

    new AdmUsers(siderbar.cells('usuarios'));

});