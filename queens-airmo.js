let int_id = window.setInterval(function() {
    let floor_frame = document.querySelector('#ShowFloorFrame');
    if (!floor_frame) return;
    window.clearInterval(int_id);

    let date_re = new RegExp(/^(\d+)\/(\d+)\/(\d\d\d\d.*)$/);
    let on_floor_frame_load = function() {
        floor_frame
            .contentWindow
            .document
            .querySelectorAll('td[data=StartTimeDisplay], div.SlideItemTextLine2')
            .forEach(function(el) {
                var match = date_re.exec(el.textContent);
                if (!match) return;
                el.textContent = match[2] + '/' + match[1] + '/' + match[3];
            });
    };
    floor_frame.addEventListener('load', on_floor_frame_load);
    on_floor_frame_load();
}, 250);
