const date_selector = 'td[data=StartTimeDisplay], div.SlideItemTextLine2, .Date';

function fix_dates(doc) {
    let date_re = new RegExp(/^(\d+)\/(\d+)\/(\d\d\d\d.*)$/);
    doc
        .querySelectorAll(date_selector)
        .forEach(function(el) {
            var match = date_re.exec(el.textContent);
            if (match) {
                el.textContent = match[2] + '/' + match[1] + '/' + match[3];
            }
        });
}

let int_id = window.setInterval(function() {
    // wait for main frame to appear in dom
    let floor_frame = document.querySelector('#ShowFloorFrame');
    if (!floor_frame) return;
    window.clearInterval(int_id);

    // fix dates when frame has loaded
    floor_frame.addEventListener('load', () => {
        fix_dates(floor_frame.contentWindow.document);

        // watch for changes to dom (eg. event modal dialogs)
        let observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                // listen for eventdiv added to dom
                if (mutation.type !== 'childList' || !mutation.addedNodes) continue;
                for (let added_node of mutation.addedNodes) {
                    if (added_node.id !== 'EventDiv') continue;

                    // when the event-frame loads, fix its dates too
                    let event_frame = added_node.querySelector('#EventFrame');
                    if (event_frame) {
                        event_frame.addEventListener('load', () => {
                            fix_dates(event_frame.contentWindow.document);
                        });
                    }
                }
            }
        });
        observer.observe(
            floor_frame.contentWindow.document.body,
            { attributes: false, childList: true, subtree: false },
        );
    });
}, 50);
