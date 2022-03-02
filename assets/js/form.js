const mascara_padrao = /[^0-9]/;

function formata_Mascara(e){
        if(mascara_padrao.test(e.key)){
            e.preventDefault();
            return;
        }
        if(!e.target.value) return;

        vlr_mask_mask = e.target.value.toString();
        vlr_mask = vlr_mask.replace(/[\D]+/g, '');
        vlr_mask = vlr_mask.replace(/([0-9]{1})$/g, ",$1");

	if(vlr_mask.length >= 6){
		while(/([0-9]{4})[,|\.]/g.test(vlr_mask)){
			vlr_mask = vlr_mask.replace(/([0-9]{1})$/g, ",$1");
			vlr_mask = vlr_mask.replace(/([0-9]{3})[,|\.]/g, ".$1");
		}
	}

	e.target.value = vlr_mask;

}
