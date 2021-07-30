document.querySelector('.c_button').addEventListener("click", () => {
    if(document.querySelector('#c_name').value == '') {document.querySelector('#c_name').classList.add('c_error');return;}
    if(document.querySelector('#c_text').value == '') {document.querySelector('#c_text').classList.add('c_error');return;}

    document.querySelector('#с_success').innerHTML = `<h2 style="text-align: center;">Ваш отзыв успешно отправлен!<br>Он будет опубликован после модерации</h2>`;
});

var countR = 6; //количество отзывов
var version = 1; //версия 1 - это загрузка без сохранения, а версия 2 - сохраняет то, что загружено
var first = true;
var el;

document.addEventListener("DOMContentLoaded", () => {

    if(version == 2){
    (async () => {
        let response = await fetch('comms.php?all=1');
        let els = await response.json();
      


    if( els == undefined || els == '' || els == null || els == 'null' ) {

    } else {

        for (let i = 0; i < els.length; i++) {
            
            if(countR == 0) break;

            let comm = document.createElement('div');
            comm.classList.add('c_comment');
            comm.innerHTML = `
            <span class="c_name">${els[i].name}</span>
            <span class="c_date">${els[i].date}</span>
            <div class="c_text">${els[i].text}</div>`;
        
            document.querySelector('#c_comments2').prepend(comm);

            
            countR--;
            
          }


    }

})();
}



    var timerId = setInterval(() => {

        (async () => {
            let response;
            
            if(version == 2) { response =  await fetch('comms.php?new=1'); elem = await response.json(); }
            if(version == 1 && first) { response =  await fetch('comms.php?all=2'); el = await response.json(); }
            
            first = false;
          
            if(version == 1)elem = el.pop();
            if(version == 2)el = elem;
            
            if( countR == 0 ) { clearInterval(timerId); return;}

        if( el == undefined || el == '' || el == null || el == 'null' ) { clearInterval(timerId); return;}
    
        let comm = document.createElement('div');
        comm.classList.add('c_comment');
        comm.innerHTML = `
        <span class="c_name">${elem.name}</span>
        <span class="c_date">${elem.date}</span>
        <div class="c_text">${elem.text}</div>`;
    
        document.querySelector('#c_comments2').prepend(comm);

        countR--;


    })();
    
    }, 4000);

});