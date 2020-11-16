$(document).ready(function(){
    const API = 'https://pokeapi.co/api/v2'

    let modal = $("#my_modal")
    let span = $(".close_modal_window");
    let pokemonDetailList = $('.pokemon-detail-list')
    let nextUrl = ''
    let prevUrl = ''

    fetch(`${API}/pokemon/`)
        .then(res => res.json())
        .then(data => {
            prevUrl = data.previous
            nextUrl = data.next
            render(data.results)
        })
        .catch(err => console.log(err))

    function render(data){
        $('.pokemon-list').html('')
        data.forEach(item => {
            let id = item.url.split('/')
            $('.pokemon-list').append(`<li class="pokemon-detail" id=${id[id.length-2]}>${item.name}</li>`)
            $('a').css('text-decoration', 'none')
        })
    }

    $('.next-btn').on('click', function(){
        if(!nextUrl) return
        fetch(nextUrl)
        .then(res => res.json())
        .then(data => {
            prevUrl = data.previous
            nextUrl = data.next
            render(data.results)
        })
    })


    $('.previous-btn').on('click', function(){
        if(!prevUrl) return
        fetch(prevUrl)
        .then(res => res.json())
        .then(data => {
            prevUrl = data.previous
            nextUrl = data.next
            render(data.results)
        })
    })


    $('body').on('click', '.pokemon-detail', function(e){
        modal.css('display', 'block')
        let pokemon_id = $(e.target).attr('id')
        fetch(`${API}/pokemon/` + pokemon_id + '/')
            .then(res => res.json())
            .then(data => {
                pokemonDetailList.html('')
                pokemonDetailList.append(
                    `<tr><td>Имя</td>
                    <td>Тип</td>
                    <td>Рост</td>
                    <td>Вес</td>
                    <td>Изображение</td></tr>
                    <tr><td>${data.name}</td>
                    <td>${data.types[0].type.name}</td>
                    <td>${data.height}</td>
                    <td>${data.weight}</td>
                    <td><img src=${data.sprites.front_default}></td></tr>`
                    )
            })
    })

    span.on('click', function(event) {
        event.stopPropagation()
        modal.css('display', 'none');
    })

    $(window).on('click', function(event) {
        if ($(event.target).is(modal)){
            modal.css('display', 'none');
        }
    })
})