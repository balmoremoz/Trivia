const btnContinuar = document.getElementById("btnContinuar");


var mobile = /android|bb|blackberry|iphone|ipad|ipod|ios|phone|iemobile|ie-mobile|ie mobile|windows ce/.test(navigator.userAgent.toLowerCase()),
    p = document.getElementById("page-wrapper"),
	w = document.getElementById("stepper-wrapper"),
	wP = document.getElementById("stepper-wrapper-puntos"),
	n = document.getElementById("number"),
	nPuntos=document.getElementById("numPuntos")
	u = document.getElementById("step-up"),
	d = document.getElementById("step-down"),
	pU = document.getElementById("puntos-up"),
	dU = document.getElementById("puntos-down"),
	nmin = Number(n.getAttribute("min")),
	nmax = Number(n.getAttribute("max")),
	nminPuntos = Number(nPuntos.getAttribute("min")),
	nmaxlength = Number(n.getAttribute("maxlength")),
	nPuntosmaxlength = Number(nPuntos.getAttribute("maxlength")),
	caretPos = {'start': 1, 'end': 1},
	yStart = 0,
	yGrow = 250,
	yTimer = null,
	expChangeOffset = 0.05,
	interval = 200;

n.removeAttribute("min");
n.removeAttribute("max");
n.type = "text";
n.setAttribute("pattern", "[0-9]*");

function throttle(fn, threshhold, scope) {
	threshhold || (threshhold = 250);
	var last, deferTimer;
	return function() {
		var context = scope || this;
		var now = +new Date,
			args = arguments;
		if (last && now < last + threshhold) {
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function() {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		}
		else {
			last = now;
			fn.apply(context, args);
		}
	};
}

function getCaretPosition(ctrl) {
	// IE < 9 Support
	if (document.selection) {
		ctrl.focus();
		var range = document.selection.createRange();
		var rangelen = range.text.length;
		range.moveStart ('character', -ctrl.value.length);
		var start = range.text.length - rangelen;
		return {'start': start, 'end': start + rangelen};
	}

	// IE >=9 and other browsers
	else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
		return {'start': ctrl.selectionStart, 'end': ctrl.selectionEnd};
	}

	else {
		return {'start': ctrl.value.length, 'end': ctrl.value.length};
	}
}

function setCaretPosition(ctrl, start, end) {
	// IE >= 9 and other browsers
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(start, end);
	}

	// IE < 9
	else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', end);
		range.moveStart('character', start);
		range.select();
	}
}

var expChangeUp = function(num, offset, m) {
	num = Number(num);
	offset = offset || 1;
	m = m || 1.03;

	num = Math.ceil(num + offset * expChangeOffset);
	expChangeOffset = expChangeOffset * m;
	return num;
}

var expChangeDown = function(num, offset, m) {
	num = Number(num);
	offset = offset || 1;
	m = m || 1.03;

	num = Math.floor(num - offset * expChangeOffset);
	expChangeOffset = expChangeOffset * m;
	return num;
}

var yClick = function(t) {
	if (yGrow > 22) {
		yGrow = Math.floor(yGrow * 0.93);
	}

	yTimer = setTimeout(function() {
		t.click();
		yClick(t);
	}, yGrow);
};

var mwheel = throttle(function(e) {
	var e = window.event || e;
	n.value = Math.min(Math.max(Number(n.value) + (Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) * -1), nmin), nmax);
/*
	e.preventDefault();
	e.stopPropagation();
	return false;
*/
}, 20);

var mtouch = throttle(function(e) {
	var e = window.event || e;
	n.value = Math.min(Math.max(Number(n.value) + (Math.max(-1, Math.min(1, (e.pageY || e.originalEvent.touches[0].pageY) - yStart))) * -1, nmin), nmax);
	yStart = (e.pageY || e.originalEvent.touches[0].pageY);

	e.preventDefault();
	e.stopPropagation();
	return false;
}, 10);

function s() {
	n.focus();
	n.select();
	n.setSelectionRange(n.value.length, n.value.length);
}

p.focus();

n.onfocus = s;

/*
n.onblur = function() {
	n.value = String(Number(String(n.value).replace(/[^0-9]+/g,""))).substr(0, nmaxlength);
};
*/


onkeydown = function(e) {
	if (e.which === null && (e.charCode !== null || e.keyCode !== null)) {
		e.which = e.charCode !== null ? e.charCode : e.keyCode;
	}
	var c = e.which;

	if (c === 27) { // Escape key
		// p.style.display = "block";
		p.setAttribute("tabindex", "-1");
		p.focus();

		e.preventDefault();
		e.stopPropagation();
		return false;
	}
};


p.onkeydown = throttle(function(e) {
    if (e.which === null && (e.charCode !== null || e.keyCode !== null)) {
		e.which = e.charCode !== null ? e.charCode : e.keyCode;
	}

	var c = e.which,
		m = 1,
		alt = e.altKey,
		ctrl = e.ctrlKey,
		meta = e.metaKey,
		shift = e.shiftKey;

    // KeyCode reference: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

    if (c === 8 || c === 46 || (c >= 48 && c <= 57) || (c >= 96 && c <= 105)) {
        // Numeric input keys, and backspace/delete
    }
    else if ((c >= 16 && c <= 26) || (c >= 33 && c <= 45) || (c >= 91 && c <= 93) || (c >= 112 && c <= 145)) {
        // Non-input keys, but do not disable

        if (meta || ctrl) {
            m = 100;
        }
        else if (alt) {
            m = 50;
        }
        else if (shift) {
            m = 10;
        }
        else {
            m = 1;
        }

        if (c === 38) {
			if (m === 1) {
				n.value = Math.min(expChangeUp(n.value, m, 1.1), nmax);
			}

			else {
				n.value = Math.min(Number(n.value) + m, nmax);
			}

            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        else if (c === 40) {
			if (m === 1) {
				n.value = Math.max(expChangeDown(n.value, m, 1.1), nmin);
			}

			else {
				n.value = Math.max(Number(n.value) - m, nmin);
			}

            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        m = 1;
    }

    else {
        // Disable everything else

        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}, 10);

p.onkeyup = function(e) {
    if (e.which === null && (e.charCode !== null || e.keyCode !== null)) {
		e.which = e.charCode !== null ? e.charCode : e.keyCode;
	}
	var c = e.which;

    // KeyCode reference: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

	if (c === 8 || c === 46) {
		if (n.value === "") {
			n.value = "0";
			caretPos = getCaretPosition(n);
			setCaretPosition(n, 1, 1);
		}
	}

    else if ((c >= 48 && c <= 57) || (c >= 96 && c <= 105)) {
        // Numeric input keys, and backspace/delete

		caretPos = getCaretPosition(n);
        n.value = String(Number(String(n.value).replace(/[^0-9]+/g,""))).substr(0, nmaxlength);
		setCaretPosition(n, caretPos.start, caretPos.end);
    }

	expChangeOffset = 0.01;

	clearTimeout(yTimer);
	yTimer = null;
	yGrow = 250;
};

n.oncut = n.onpaste = function() {
    setTimeout(function() {
		caretPos = getCaretPosition(n);
        n.value = String(Number(String(n.value).replace(/[^0-9]+/g,""))).substr(0, nmaxlength);
		setCaretPosition(n, caretPos.start, caretPos.end);
    }, 0);
};

u.onclick = function(e) {
	let v = Number(n.value),
		m = 1,
		alt = e.altKey,
		ctrl = e.ctrlKey,
		meta = e.metaKey,
		shift = e.shiftKey;

    if (meta || ctrl) {
        m = 100;
    }
    else if (alt) {
        m = 50;
    }
    else if (shift) {
        m = 10;
    }
    else {
        m = 1;
    }

	if (m === 1) {
		n.value = Math.min(expChangeUp(v, m, 1.03), nmax);
	}

	else {
		n.value = Math.min(v + m, nmax);
	}

	m = 1;

    e.preventDefault();
    e.stopPropagation();
    return false;
};

d.onclick = function(e) {
	let v = Number(n.value),
		m = 1,
		alt = e.altKey,
		ctrl = e.ctrlKey,
		meta = e.metaKey,
		shift = e.shiftKey;

    if (meta || ctrl) {
        m = 100;
    }
    else if (alt) {
        m = 50;
    }
    else if (shift) {
        m = 10;
    }
    else {
        m = 1;
    }

	if (m === 1) {
		n.value = Math.max(expChangeDown(v, m, 1.03), nmin);
	}

	else {
		n.value = Math.max(v - m, nmin);
	}

	m = 1;

    e.preventDefault();
    e.stopPropagation();
    return false;
};

pU.onclick = function(e) {
	let v = Number(numPuntos.value),
		m = 1,
		alt = e.altKey,
		ctrl = e.ctrlKey,
		meta = e.metaKey,
		shift = e.shiftKey;

    if (meta || ctrl) {
        m = 100;
    }
    else if (alt) {
        m = 50;
    }
    else if (shift) {
        m = 10;
    }
    else {
        m = 1;
    }

	if (m === 1) {
		nPuntos.value = Math.min(expChangeUp(v, m, 1.03));
	}

	else {
		nPuntos.value = Math.min(v + m);
	}

	m = 1;

    e.preventDefault();
    e.stopPropagation();
    return false;
};

dU.onclick = function(e) {
	let v = Number(numPuntos.value),
		m = 1,
		alt = e.altKey,
		ctrl = e.ctrlKey,
		meta = e.metaKey,
		shift = e.shiftKey;

    if (meta || ctrl) {
        m = 100;
    }
    else if (alt) {
        m = 50;
    }
    else if (shift) {
        m = 10;
    }
    else {
        m = 1;
    }

	if (m === 1) {
		nPuntos.value = Math.max(expChangeDown(v, m, 1.03),nminPuntos);
	}

	else {
		nPuntos.value = Math.max(v - m, nminPuntos);
	}

	m = 1;

    e.preventDefault();
    e.stopPropagation();
    return false;
};
p.ontouchstart = function(e) {
    // document.activeElement.blur();
	yStart = e.pageY || e.originalEvent.touches[0].pageY;
};

p.ontouchmove = mtouch;

//----------------------------------------------INICIO---------------------------------------//
function redireccionarAlJuego() {
	let numJugadores = document.querySelector('[name="number"]').value;
	let meta=document.querySelector('[name="numPuntos"]').value;
	$.ajax({
		type: "GET",
		url: "http://localhost:8081/Juego",
		success: function(response) {
			$("#content").html(response);
			$("#content").attr("class", "d-block");
			$('#page-wrapper').hide();
			document.getElementsByTagName("head")[0].innerHTML+="<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' rel='stylesheet'></link>";
			generarTablero(10,10,numJugadores,meta);
			$( "#cssInput" ).remove();
		},

		error: function(e, xhr) {
			mostrarGrowlError("Se ha producido un error al guardar la lista de contenedores", "default");
			console.log('error guardado' + e.responseText);
		}
	});
}