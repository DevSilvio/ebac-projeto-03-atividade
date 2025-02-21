$(document).ready(function () {
    $('#tel').mask('(00) 00000-0000');

    function validaNome (nomeCompleto) {
        const nomeArray = nomeCompleto.trim().split(' ');
        return nomeArray.length >= 2 && nomeArray.every(nome => nome.length > 1)
    }

    $('#nome').on('keyup', function() {
        const nomeAtual = $(this).val();
        const filtraNome = nomeAtual.replace(/[^a-zA-Z\s]/g, "");
        $(this).val(filtraNome);
    })

    function validaNumero (numeroCompleto) {
        const numSemMask = numeroCompleto.replace(/\D/g, '');
        return numSemMask.length === 11;
    }

    function validaEmail (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validaCampo (campo, validacao, feedback) {
        const valor = $(campo).val();
        if(validacao(valor)){
            $(campo).removeClass('is-invalid').addClass('is-valid');
            $(feedback).hide();
            return true;
        }else {
            $(campo).removeClass('is-valid').addClass('is-invalid');
            $(feedback).show();
            return false;
        }
    }

    $('input').on('keyup', function(){
        const id = $(this).attr('id');
        if(id === 'nome') validaCampo ('#nome', validaNome, '.nomeFeedback');
        if(id === 'tel') validaCampo ('#tel', validaNumero, '.telFeedback');
        if(id === 'email') validaCampo ('#email', validaEmail, '.emailFeedback');
    })
    
    $('form').validate({
        rules: {
            nome: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true
            },
            mensagem: {
                required: true
            },
        },

        messages: {
            nome: 'Preencha o nome completo',
            email: 'Coloque um e-mail existe',
            tel: 'Coloque seu número de telefone',
            mensagem: 'Escreva aqui sua mensagem'
        },

        submitHandler: function (form) {
            alert("Mensagem enviada, em breve retornaremos o contato!");
            form.reset();
        },
        invalidHandler: function (form, validator) {
            alert("Por favor, preencha os campos!");
        }
    })

})