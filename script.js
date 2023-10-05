function htmel() {
    document.getElementById("shipgame").innerHTML = ""
    let pp = document.createElement("div")
    pp.setAttribute("id", "pickpanel")
    document.getElementById("shipgame").appendChild(pp)

    let player = document.createElement("div")
    player.setAttribute("id", "player")
    let text_in_player = document.createElement("h1")
    text_in_player.setAttribute("style", "text-align: center")
    text_in_player.setAttribute("id", "text-gracz")
    text_in_player.innerHTML = "GRACZ"
    player.appendChild(text_in_player)
    document.getElementById("shipgame").appendChild(player)

    let min = document.createElement("div")
    min.setAttribute("id", "main")
    let text_in_main = document.createElement("h1")
    text_in_main.setAttribute("style", "text-align: center")
    text_in_main.setAttribute("id", "text-komputer")
    text_in_main.innerHTML = "KOMPUTER"
    min.appendChild(text_in_main)
    document.getElementById("shipgame").appendChild(min)

    let btm = document.createElement("div")
    btm.setAttribute("id", "bottom_bar")
    let text_in_btm1 = document.createElement("h1")
    let text_in_btm2 = document.createElement("h1")
    let text_in_btm3 = document.createElement("h1")
    let text_in_btm4 = document.createElement("h1")
    text_in_btm1.setAttribute("id", "plscore")
    text_in_btm1.innerHTML = "Twój wynik: 0"
    text_in_btm2.setAttribute("id", "pcscore")
    text_in_btm2.innerHTML = "Wynik PC: 0"
    text_in_btm3.setAttribute("id", "plwin")
    text_in_btm3.innerHTML = "WYGRANA GRACZA"
    text_in_btm4.setAttribute("id", "pcwin")
    text_in_btm4.innerHTML = "WYGRANA KOMPUTERA"

    btm.appendChild(text_in_btm1)
    btm.appendChild(text_in_btm2)
    btm.appendChild(text_in_btm3)
    btm.appendChild(text_in_btm4)
    document.getElementById("shipgame").appendChild(btm)

    let buttonField = document.createElement("div")
    buttonField.setAttribute("id", "buttonfield")
    let btn = document.createElement("button")
    btn.setAttribute("id", "startButton")
    btn.innerHTML = "ROZPOCZĘCIE GRY"
    buttonField.appendChild(btn)
    document.getElementById("shipgame").appendChild(buttonField)


}
function statki() {
    htmel()
    var n = 10; //tab size
    var ships_count = 10;
    var mast_count = 20;
    var offset_tab_size = n + 2;
    var b = Array.from(Array(offset_tab_size), () => {
        return new Array(offset_tab_size).fill(0)
    })
    function createShip(ship_size) {
        var ships = 0;
        while (ships != 1) {
            var x = Math.floor((Math.random() * -(n - mast_count + 1)) + 1);
            var y = Math.floor((Math.random() * -(n - mast_count + 1)) + 1);
            var direction = Math.floor((Math.random() * 2) + 0); //0 - horizontal 1 - vertical
            var left_top_x = x - 1;
            var left_top_y = y - 1;
            var occupied_flag = 0;

            if (direction == 1) {
                if (y + ship_size - 1 <= 10) {
                    for (i = 0; i <= 2; i++) {
                        for (g = 0; g < ship_size + 2; g++) {
                            if (b[left_top_y + g][left_top_x + i] == 0) {
                                occupied_flag++
                            }
                        }
                    }
                    let sqs = 3 * (ship_size + 2)
                    if (occupied_flag == sqs) {
                        for (i = 0; i < ship_size; i++) {
                            b[y + i][x] = 1
                        }
                        ships++;
                    }
                }
            }
            else {
                if (x + ship_size - 1 <= 10) {
                    for (i = 0; i <= 2; i++) {
                        for (g = 0; g < ship_size + 2; g++) {
                            if (b[left_top_y + i][left_top_x + g] == 0) {
                                occupied_flag++
                            }
                        }
                    }
                    let sqs = 3 * (ship_size + 2)
                    if (occupied_flag == sqs) {
                        for (i = 0; i < ship_size; i++) {
                            b[y][x + i] = 1
                        }
                        ships++;

                    }
                }
            }
        }

    }
    createShip(4);
    createShip(3);
    createShip(3);
    createShip(2);
    createShip(2);
    createShip(2);
    createShip(1);
    createShip(1);
    createShip(1);
    createShip(1);


    var selected_ship_size = 4;
    var selected_dir = 0;
    var occ = 0;
    var border = 0;
    var value1
    var value2
    var id
    var placed_ships = 0
    var game_rn = 0;
    var start_game = 0;
    var pc_score = 0;
    var player_score = 0;
    var pc_move = 0
    var kolej = 0;
    var c = Array.from(Array(offset_tab_size + 4), () => {
        return new Array(offset_tab_size + 4).fill(0)
    })
    for (g = 1; g <= n; g++) {
        for (i = 1; i <= n; i++) {
            let div = document.createElement("div");
            div.setAttribute("id", g - 1 + String(i - 1));
            div.setAttribute("class", "row");

            div.oncontextmenu = function () {
                if (selected_dir == 0) {
                    selected_dir = 1;
                }
                else {
                    selected_dir = 0;
                }
                return false;
            }
            div.onmouseover = function () {
                value1 = parseInt(div.id[0])
                value2 = parseInt(div.id[1])
                function checkOcc() {
                    occ = 0
                    if (value2 + selected_ship_size >= 11) {
                        border = 1;
                    }
                    else {
                        border = 0
                    }
                    for (i = 0; i <= 2; i++) {
                        for (g = 0; g < selected_ship_size + 2; g++) {
                            if (border == 0) {
                                if (c[value1 + i][value2 + g] == 2) {
                                    occ = 1
                                }
                            }
                            else {
                                if (c[value1 + i][11 - g] == 2) {
                                    occ = 1
                                }
                            }
                        }
                    }
                }
                function checkOccVert() {
                    occ = 0
                    if (value1 + selected_ship_size >= 11) {
                        border = 1;
                    }
                    else {
                        border = 0
                    }
                    for (i = 0; i <= 2; i++) {
                        for (g = 0; g < selected_ship_size + 2; g++) {
                            if (border == 0) {
                                if (c[value1 + g][value2 + i] == 2) {
                                    occ = 1
                                }
                            }
                            else {
                                if (c[11 - g][value2 + i] == 2) {
                                    occ = 1
                                }
                            }


                        }
                    }
                }
                if (selected_dir == 0) {
                    checkOcc()
                    if (occ == 0) {
                        if (border == 0) {
                            for (i = 0; i < selected_ship_size; i++) {
                                if (c[value1 + 1][value2 + 1 + i] != 2) {
                                    c[value1 + 1][value2 + 1 + i] = 1
                                }
                                id = String(value1) + String(value2 + i)
                                if (document.getElementById(id).style.backgroundColor != "pink") {
                                    document.getElementById(id).style.backgroundColor = "green";
                                }
                            }
                        }
                        else {
                            for (i = 0; i < selected_ship_size; i++) {
                                if (c[value1 + 1][10 - i] != 2) {
                                    c[value1 + 1][10 - i] = 1
                                }
                                id = String(value1) + String(9 - i)
                                if (document.getElementById(id).style.backgroundColor != "pink") {
                                    document.getElementById(id).style.backgroundColor = "green";
                                }
                            }
                        }

                    }
                    else {
                        if (border == 0) {
                            for (i = 0; i < selected_ship_size; i++) {
                                id = String(value1) + String(value2 + i)
                                if (document.getElementById(id).style.backgroundColor != "pink") {
                                    document.getElementById(id).style.backgroundColor = "grey";
                                }
                            }
                        }
                        else {
                            for (i = 0; i < selected_ship_size; i++) {
                                if (c[value1 + 1][10 - i] != 2) {
                                    c[value1 + 1][10 - i] = 1
                                }
                                id = String(value1) + String(9 - i)
                                if (document.getElementById(id).style.backgroundColor != "pink") {
                                    document.getElementById(id).style.backgroundColor = "grey";
                                }
                            }
                        }

                        checkOcc()
                    }
                }
                else {
                    checkOccVert()
                    if (occ == 0) {
                        if (border == 0) {
                            for (i = 0; i < selected_ship_size; i++) {
                                if (c[value1 + 1 + i][value2 + 1] != 2) {
                                    c[value1 + 1 + i][value2 + 1] = 1
                                }
                                id = String(value1 + i) + String(value2)
                                if (document.getElementById(id).style.backgroundColor != "pink") {
                                    document.getElementById(id).style.backgroundColor = "green";
                                }
                            }
                        }
                        else {
                            for (i = 0; i < selected_ship_size; i++) {
                                if (c[10 - i][value2 + 1] != 2) {
                                    c[10 - i][value2 + 1] = 1
                                }
                                id = String(9 - i) + String(value2)
                                if (document.getElementById(id).style.backgroundColor != "pink") {
                                    document.getElementById(id).style.backgroundColor = "green";
                                }
                            }
                        }

                    }
                    else {
                        if (border == 0) {
                            for (i = 0; i < selected_ship_size; i++) {
                                id = String(value1 + i) + String(value2)
                                if (document.getElementById(id).style.backgroundColor != "pink") {
                                    document.getElementById(id).style.backgroundColor = "grey";
                                }
                            }
                        }
                        else {
                            for (i = 0; i < selected_ship_size; i++) {
                                id = String(9 - i) + String(value2)
                                if (document.getElementById(id).style.backgroundColor != "pink") {
                                    document.getElementById(id).style.backgroundColor = "grey";
                                }
                            }
                        }
                        checkOccVert()
                    }
                }

                div.onclick = function () {
                    for (i = 0; i < 12; i++) {
                        for (g = 0; g < 12; g++) {
                            if (c[i][g] == 1) {
                                c[i][g] = 2
                            }
                        }
                    }
                    for (i = 0; i < 10; i++) {
                        for (g = 0; g < 10; g++) {
                            if (document.getElementById(String(i) + String(g)).style.backgroundColor == "green") {
                                document.getElementById(String(i) + String(g)).style.backgroundColor = "pink";
                            }
                        }
                    }
                    if (occ == 0) {
                        let lista = document.getElementById("pickpanel")
                        let usuwany = document.getElementById(selected_ship)
                        usuwany.style.display = "none"
                        selected_ship_size = 0
                    }
                    var check = 0;
                    let aa = document.getElementById("pickpanel").childElementCount;
                    for (i = 1; i <= aa; i++) {
                        let idd = "statek" + String(i)
                        if (document.getElementById(idd).style.display != "none") {
                            check = 1;
                        }
                    }
                    if (check == 0) {
                        document.getElementById("buttonfield").style.display = "block"
                    }
                    let startbtn = document.getElementById("startButton")
                    if (game_rn == 1) {
                        alert("Kliknąłeś złą planszę")
                    }

                    var x2 = 0
                    var y2 = 0
                    startbtn.onclick = function () {
                        start_game = 1;
                        startbtn.style.display = "none"
                        if (start_game == 1 && game_rn == 0) {
                            game_rn = 1
                            document.getElementById("bottom_bar").setAttribute("style", "display: block")
                            for (g = 1; g <= n; g++) {
                                for (i = 1; i <= n; i++) {
                                    let div = document.createElement("div");
                                    div.setAttribute("class", i)
                                    div.setAttribute("id", "row")
                                    div.classList.add(String(g - 1) + String(i - 1))
                                    if (b[g][i] == 1) {
                                        div.classList.add("black")
                                    }
                                    div.onclick = function () {
                                        console.table(b)
                                        if (pc_move == 0) {
                                            let actual_sign = div.innerHTML
                                            if (kolej == 0 && game_rn == 1) {
                                                let actual_sign = div.innerHTML
                                                if (div.classList.contains("black")) {
                                                    if (div.innerHTML != "X") {
                                                        player_score++
                                                        document.getElementById("plscore").innerHTML = "Twój wynik: " + String(player_score)
                                                    }
                                                    div.innerHTML = "X"
                                                }
                                                else {
                                                    div.innerHTML = "*"
                                                    kolej = 1
                                                }

                                            }
                                            if (actual_sign != "X" && actual_sign != "*") {
                                                if (kolej == 1 && game_rn == 1) {
                                                    pc_move = 1
                                                    var ruch_pc = setInterval(function () {
                                                        //while (kolej == 1) {
                                                        x2 = Math.floor((Math.random() * -(n - mast_count)) + 0);
                                                        y2 = Math.floor((Math.random() * -(n - mast_count)) + 0);
                                                        var rand_id = String(x2) + String(y2)
                                                        console.log(rand_id)
                                                        if (document.getElementById(rand_id).innerHTML == "X") {
                                                            let siign = document.getElementById(rand_id).innerHTML
                                                            while (siign == "*" || siign == "X") {
                                                                x2 = Math.floor((Math.random() * -(n - mast_count)) + 0);
                                                                y2 = Math.floor((Math.random() * -(n - mast_count)) + 0);
                                                                rand_id = String(x2) + String(y2)
                                                                siign = document.getElementById(rand_id).innerHTML
                                                            }

                                                        }
                                                        if (document.getElementById(rand_id).innerHTML == "*") {
                                                            let siign = document.getElementById(rand_id).innerHTML
                                                            while (siign == "*" || siign == "X") {
                                                                x2 = Math.floor((Math.random() * -(n - mast_count)) + 0);
                                                                y2 = Math.floor((Math.random() * -(n - mast_count)) + 0);
                                                                rand_id = String(x2) + String(y2)
                                                                siign = document.getElementById(rand_id).innerHTML
                                                            }

                                                        }
                                                        if (document.getElementById(rand_id).style.backgroundColor == "pink") {
                                                            if (document.getElementById(rand_id).innerHTML != "X") {
                                                                pc_score++
                                                                document.getElementById("pcscore").innerHTML = "Wynik PC: " + String(pc_score)
                                                            }
                                                            document.getElementById(rand_id).innerHTML = "X";
                                                            kolej = 1
                                                        }
                                                        else {
                                                            document.getElementById(rand_id).innerHTML = "*";
                                                            kolej = 0
                                                            clearInterval(ruch_pc);
                                                        }
                                                        console.log(document.getElementById(rand_id).innerHTML)
                                                        pc_move = 0
                                                        //}
                                                    }, 1000);
                                                }
                                                var move_check = setInterval(function () {
                                                    if (game_rn == 1) {
                                                        if (kolej == 1) {
                                                            document.getElementById("text-gracz").style.color = "black"
                                                            document.getElementById("text-komputer").style.color = "green"
                                                        }
                                                        else {
                                                            document.getElementById("text-komputer").style.color = "black"
                                                            document.getElementById("text-gracz").style.color = "green"
                                                        }
                                                    }
                                                    if (pc_score >= 20) {
                                                        game_rn = 0
                                                        start_game = 0
                                                        clearInterval(ruch_pc);
                                                        clearInterval(move_check);
                                                        document.getElementById("pcscore").setAttribute("style", "color: green")
                                                        document.getElementById("pcwin").setAttribute("style", "display: block")
                                                        let pc_ships = document.getElementsByClassName("black")
                                                        //setTimeout(function () {
                                                        //    alert("wygrana gracza")
                                                        //}, 100)
                                                        setTimeout(function () {
                                                            statki()
                                                        }, 5000)
                                                        for (i = 0; i <= pc_ships.length; i++) {
                                                            pc_ships[i].style.backgroundColor = "orange"
                                                        }


                                                    }
                                                    if (player_score >= mast_count) {
                                                        game_rn = 0
                                                        start_game = 0
                                                        clearInterval(move_check);
                                                        document.getElementById("plscore").setAttribute("style", "color: green")
                                                        document.getElementById("plwin").setAttribute("style", "display: block")
                                                        setTimeout(function () {
                                                            statki()
                                                        }, 3000)

                                                    }
                                                }, 200)

                                            }
                                        }
                                        else {
                                            alert("Teraz kolej komputera!")
                                        }

                                    }
                                    document.getElementById("main").appendChild(div)
                                }
                            }
                        }
                    }
                }
            }
            div.onmouseout = function () {
                for (i = 0; i < 10; i++) {
                    for (g = 0; g < 10; g++) {
                        if (document.getElementById(String(i) + String(g)).style.backgroundColor == "green") {
                            document.getElementById(String(i) + String(g)).style.backgroundColor = "white";
                        }
                        if (document.getElementById(String(i) + String(g)).style.backgroundColor == "grey") {
                            document.getElementById(String(i) + String(g)).style.backgroundColor = "white";
                        }
                    }
                }
                for (i = 0; i < 12; i++) {
                    for (g = 0; g < 12; g++) {
                        if (c[i][g] == 1) {
                            c[i][g] = 0
                        }
                    }
                }
            }
            document.getElementById("player").appendChild(div)
        }
    }
    var lp_statkow = 1
    var selected_ship = "statek1"
    function addShipToList(size) {
        let div1 = document.createElement("div");
        div1.setAttribute("id", "statek" + lp_statkow)
        div1.setAttribute("class", "ship_on_list")
        div1.onclick = function () {
            for (i = 1; i <= 10; i++) {
                let b = document.getElementById('statek' + i)
                b.style.backgroundColor = "white"
                selected_ship_size = size
            }
            div1.style.backgroundColor = "green"
            selected_ship = div1.id
        }
        div1.onmouseover = function () {
            if (div1.id != selected_ship) {
                div1.style.backgroundColor = "cyan"
            }
        }
        div1.onmouseout = function () {
            if (div1.id != selected_ship) {
                div1.style.backgroundColor = "white"
            }

        }
        for (g = 1; g <= size; g++) {
            let div = document.createElement("div");
            div.setAttribute("class", "klocek" + lp_statkow)
            div.setAttribute("id", "row")
            div1.appendChild(div)
        }
        document.getElementById("pickpanel").appendChild(div1)
        lp_statkow++
    }
    lp_statkow = 1
    addShipToList(4); addShipToList(3); addShipToList(3); addShipToList(2); addShipToList(2)
    addShipToList(2); addShipToList(1); addShipToList(1); addShipToList(1); addShipToList(1)
    document.getElementById("statek1").style.backgroundColor = "green"
}
statki()