var lista_mercadoriaRaw = localStorage.getItem('lista_mercadoria');
if (lista_mercadoriaRaw != null){
    var lista_mercadoria = JSON.parse(lista_mercadoriaRaw);
}else{
    var lista_mercadoria = [];
}

const formatacao = new Intl.NumberFormat('pt-Br', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2,});

async function desenha_tab_transacao(){
    let soma_total = 0;
    
    conteudo_atual =[...document.querySelectorAll('table#tab_merc tbody .conteudo_dinamico')];
    conteudo_atual.forEach(element => {
        element.remove();
    });
    
    if(lista_mercadoria.length == 0){
        document.querySelector("table.tab_merc tbody").innerHTML =
        `
        <div class="th_resumoTransacoes" id="th_resumoTransacoes" style="text-align: center;">
        <p>Nenhuma transação cadastrada.</p>
        </div>
        `
    }    
    
     console.log(document.querySelectorAll('table.tab_merc tbody .conteudo_dinamico'))
     
     for (merk in lista_mercadoria) {
         if(lista_mercadoria[merk].th_positivo_negativo == "false"){
             soma_total -= lista_mercadoria[merk].th_valor;    
            }else{
                soma_total += lista_mercadoria[merk].th_valor;    
            }
            
            document.querySelector('table.tab_merc tbody').innerHTML +=
        `<tr class="conteudo_dinamico" >
        <td style="width: 1%; text-align:center;border-bottom: 1px solid #979797;"> 
        ${(lista_mercadoria[merk].th_positivo_negativo == "false" ? '<strong  style="color:red; font-weight:bold"> - </strong>' : '<strong style="color:blue; font-weight:bold"> + </strong>')}
        </td>
        <td style="width: 70% ; text-align:left;border-bottom: 1px solid #979797;">
        ${(lista_mercadoria[merk].th_mercadoria)} 
        </td>        
        <td style="width: 29% ; text-align:right; border-bottom: 1px solid #979797;">
        ${formatacao.format(lista_mercadoria[merk].th_valor.toString().replace(/([0-9]{2})$/g, ".$1"))}
        </td>
        `
    }
    
    if(lista_mercadoria.length > 0){
            document.querySelector("table.tab_merc tbody").innerHTML +=
            `
            <th class="th_total"style="text-align: left; border-top: 1px solid #979797;" >Total </th>
            <th style="border-top: 1px solid #979797;"> </th>   
            <th class="th_valor_total" style="text-align: right; border-top: 1px solid #979797;" >
            ${formatacao.format(soma_total.toString().replace(/([0-9]{2})$/g, ".$1"))}
            </th>
            <tr>
                <th style="border: none;"> </th>
                <th style="border: none;"> </th>
                <th class="th_lucro" style="text-align: right; border: none; padding: 0px;">
                [${Math.sign(soma_total) == 1 ?  "LUCRO" : "PREJUÍZO"}]</th>
            </tr>
            `
        }
    }
    
    function registraTransacao(e) {
        e.preventDefault();
        
        transacao_atual = document.querySelector('input[name="vlr"]');
        nome_mercadoria = document.querySelector('input[name="mercadoria"]');
        tipotransacao = document.querySelector('select[name="tipo_transacao"]');
        
        if(!nome_mercadoria.value){
                nome_mercadoria.focus();
                return;
            }
  
        console.log(transacao_atual.value && transacao_atual.value.replace(/[^0-9]+/g, "") == "")
            
        if(transacao_atual.value.replace(/[^0-9]+/g, "") == ""){
            transacao_atual.focus();
            alert('Digite apenas números no campo "Valor".')
            return;
        }
 
        numero_atual = parseInt(transacao_atual.value.replace(/[^0-9]/g, ""));
        
        lista_mercadoria.push({
            th_positivo_negativo: (e.target.elements["tipo_transacao"].value),
            th_mercadoria: e.target.elements["mercadoria"].value,
            th_valor: numero_atual
        })
        
        nome_mercadoria.value = "";
        transacao_atual.value = "";
        
        localStorage.setItem('lista_mercadoria', JSON.stringify (lista_mercadoria));
         location.reload();
     }
    
    function foco_nova_mercadoria(){
        document.getElementById("mercadoria").focus();
    }

    function limpar_dados(){
        let confirmar = confirm("Deseja apagar TODOS os dados!?!?");
        if(confirmar){
            lista_mercadoria.splice([]);
            localStorage.clear();
            desenha_tab_transacao();
        } 
    }
desenha_tab_transacao();


