// Copyright (c) 2015 Jefferson Lee
// Copyright (c) 2018 Ritwik Abhishek
// Copyright (c) 2018 Walter Bender
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the The GNU Affero General Public
// License as published by the Free Software Foundation; either
// version 3 of the License, or (at your option) any later version.
//
// You should have received a copy of the GNU Affero General Public
// License along with this library; if not, write to the Free Software
// Foundation, 51 Franklin Street, Suite 500 Boston, MA 02110-1335 USA

var afaf = [];
var bfbf = [];

function MusicKeyboard() {
    var synth = new Tone.Synth().toMaster();

    const BUTTONDIVWIDTH = 295;  // 5 buttons
    const DRUMNAMEWIDTH = 50;
    const OUTERWINDOWWIDTH = 128;
    const INNERWINDOWWIDTH = 50;
    const BUTTONSIZE = 53;
    const ICONSIZE = 32;

    this._rowBlocks1 = [];
    this.rowLabels1 = [];
    this.rowArgs1 = [];

    var keyboard = document.getElementById('keyboard');
    var keyboardHolder = document.getElementById('keyboardHolder');
    var firstOctave = document.getElementById('firstOctave');
    var firstNote = document.getElementById('firstNote');
    var secondOctave = document.getElementById('secondOctave');
    var secondNote = document.getElementById('secondNote');
    var whiteKeys = document.getElementById('white');
    var blackKeys = document.getElementById('black');

    var whiteNoteEnums = ['C','D','E','F','G','A','B'];
    var blackNoteEnums = ['C♯', 'D♯', null, 'F♯', 'G♯', 'A♯', null];

    var noteConversion2 = {'do': 'C', 're': 'D', 'mi': 'E', 'fa': 'F', 'sol': 'G', 'la': 'A', 'ti': 'B', 'do♯': 'C♯', 're♯': 'D♯', 'mi♯': 'E♯', 'fa♯': 'F♯', 'sol♯': 'G♯', 'la♯': 'A♯', 'ti♯': 'B♯', 'rest': 'R'};

    var selected = [];
    var selected1 = [];
    var customKeyboard = 0;
    var standardKeyboard = 0;

    this.processClick = function(i) {
        console.log(i);
        var temp1 = afaf[i];
        var temp2 = noteConversion2[temp1] + bfbf[i];
        console.log('onkeypress ' + temp2);
        selected1.push(temp2);

        synth.triggerAttackRelease(temp2, '8n');
    };

    this.loadHandler = function(element, i) {
        var that = this;
        element.onclick = function() {
            that.processClick(i);
        };
    };

    this.init = function(logo) {
        this._logo = logo; 

        var w = window.innerWidth;
        this._cellScale = w / 1200;
        var iconSize = ICONSIZE * this._cellScale;

        var canvas = docById('myCanvas');

        // Position the widget and make it visible.
        var mkbDiv = docById('mkbDiv');
        mkbDiv.style.visibility = 'visible';
        mkbDiv.setAttribute('draggable', 'true');
        mkbDiv.style.left = '200px';
        mkbDiv.style.top = '150px';

        // The mkb buttons
        var mkbButtonsDiv = docById('mkbButtonsDiv');
        mkbButtonsDiv.style.display = 'inline';
        mkbButtonsDiv.style.visibility = 'visible';
        mkbButtonsDiv.style.width = BUTTONDIVWIDTH;
        mkbButtonsDiv.innerHTML = '<table cellpadding="0px" id="mkbButtonTable"></table>';

        var buttonTable1 = docById('mkbButtonTable');
        var header1 = buttonTable1.createTHead();
        var row1 = header1.insertRow(0);

        // For the button callbacks
        var that = this;
        if (this.rowLabels1.length == 0) {
            document.getElementById('keyboardHolder').style.display = 'block';
            standardKeyboard = 1;
        } else {
            document.getElementById('keyboardHolder2').style.display = 'block';
            customKeyboard = 1;

            var idContainer = [];
            var idContainer2 = [];

            for (var p = 0; p < this.rowLabels1.length; p++){
                if (this.rowLabels1[p][2] === '♯' || this.rowLabels1[p][3] === '♯'){
                    var parenttbl2 = document.getElementById('myrow2');
                    var newel2 = document.createElement('td');
                    var elementid2 = document.getElementsByTagName('td').length
                    
                    newel2.setAttribute('id',elementid2);
                    idContainer.push(elementid2);
                    newel2.innerHTML = this.rowLabels1[p] + this.rowArgs1[p];
                    parenttbl2.appendChild(newel2);
                } else {
                    var parenttbl = document.getElementById('myrow');
                    var newel = document.createElement('td');
                    var elementid = document.getElementsByTagName('td').length
                
                    newel.setAttribute('id',elementid);
                    idContainer.push(elementid);
                    newel.innerHTML = this.rowLabels1[p] + this.rowArgs1[p];
                    parenttbl.appendChild(newel);
                }
            }

            afaf = this.rowLabels1;
            bfbf = this.rowArgs1;

            console.log('idContainer ' + idContainer);
            console.log('idContainer2 ' + idContainer2);
            console.log('afaf ' + afaf);
            console.log('bfbf ' + bfbf);

            for (var i = 0; i < idContainer.length; i++) {
                this.loadHandler(document.getElementById(idContainer[i]), i);
            }
        }

        var cell1 = this._addButton(row1, 'play-button.svg', ICONSIZE, _('play'));

        cell1.onclick=function() {
            that._logo.setTurtleDelay(0);
            if (selected.length > 0 ) {
                   for (var q = 0; q<selected.length; q++) {
                    var zx = selected[q];
                    if (zx.charAt(1) === '♯') {
                            console.log('hash found');
                            var res = zx.replace('♯', '#');
                    } else {
                            res = zx;
                    }
                    console.log('res '  + res);
                    synth.triggerAttackRelease(res, '8n');
                    sleep(500);
                }
                } else {
                    for (var q = 0; q<selected1.length; q++) {
                    var zx = selected1[q];
                    if (zx.charAt(1) === '♯') {
                            console.log('hash found');
                            var res = zx.replace('♯', '#');
                    } else {
                            res = zx;
                    }

                    console.log('res '  + res);
                    synth.triggerAttackRelease(res, '8n');
                    sleep(500);
                }
                }
        };

        var cell1 = this._addButton(row1, 'export-chunk.svg', ICONSIZE, _('save'));

        cell1.onclick=function() {
            if (selected.length > 0) {
                that._save1(selected);
            } else {
                that._save1(selected1);
            }
        };

        var cell1 = this._addButton(row1, 'erase-button.svg', ICONSIZE, _('clear'));

        cell1.onclick=function() {
            selected = [];
            selected1 = [];
        };

        var cell1 = this._addButton(row1,'close-button.svg', ICONSIZE, _('close'));

        cell1.onclick=function() {
            mkbDiv.style.visibility = 'hidden';
            mkbButtonsDiv.style.visibility = 'hidden';
            document.getElementById('keyboardHolder').style.display = 'none';
            document.getElementById('keyboardHolder2').style.display = 'none';
            var myNode = document.getElementById('myrow');
            myNode.innerHTML = '';
            var myNode = document.getElementById('myrow2');
            myNode.innerHTML = '';
            selected = [];
            selected1 = [];
        };

        var dragCell = this._addButton(row1, 'grab.svg', ICONSIZE, _('drag'));
        dragCell.style.cursor = 'move';

        this._dx = dragCell.getBoundingClientRect().left - mkbDiv.getBoundingClientRect().left;
        this._dy = dragCell.getBoundingClientRect().top - mkbDiv.getBoundingClientRect().top;
        this._dragging = false;
        this._target = false;
        this._dragCellHTML = dragCell.innerHTML;

        dragCell.onmouseover = function(e) {
            // In order to prevent the dragged item from triggering a
            // browser reload in Firefox, we empty the cell contents
            // before dragging.
            dragCell.innerHTML = '';
        };

        dragCell.onmouseout = function(e) {
            if (!that._dragging) {
                dragCell.innerHTML = that._dragCellHTML;
            }
        };

        canvas.ondragover = function(e) {
            e.preventDefault();
        };

        canvas.ondrop = function(e) {
            if (that._dragging) {
                that._dragging = false;
                var x = e.clientX - that._dx;
                mkbDiv.style.left = x + 'px';
                var y = e.clientY - that._dy;
                mkbDiv.style.top = y + 'px';
                dragCell.innerHTML = that._dragCellHTML;
            }
        };

        mkbDiv.ondragover = function(e) {
            e.preventDefault();
        };

        mkbDiv.ondrop = function(e) {
            if (that._dragging) {
                that._dragging = false;
                var x = e.clientX - that._dx;
                mkbDiv.style.left = x + 'px';
                var y = e.clientY - that._dy;
                mkbDiv.style.top = y + 'px';
                dragCell.innerHTML = that._dragCellHTML;
            }
        };

        mkbDiv.onmousedown = function(e) {
            that._dragging = true;
            that._target = e.target;
        };

        mkbDiv.ondragstart = function(e) {
            if (dragCell.contains(that._target)) {
                e.dataTransfer.setData('text/plain', '');
            } else {
                e.preventDefault();
            }
        };
    };

    changeKeys();

    function changeKeys() {
        console.log('INside changeKeys');
        whiteKeys.innerHTML = '';
        blackKeys.innerHTML = '';
        var note1 = firstNote.value;
        var note2 = secondNote.value;
        var oct1 = firstOctave.value;
        var oct2 = secondOctave.value;
        //sanity checks
        //missing values
        if (note1 === '' || note2 === '' || oct1 === '' || oct2 === '') {
            return;
        }

        //2nd octave < 1st octave
        if (oct2 < oct1) {
            var tmp = oct1;
            oct1 = oct2;
            oct2 = tmp;
        }
        //2nd key comes before 1st key on same octave
        if (oct1 === oct2 && whiteNoteEnums.indexOf(note1) > whiteNoteEnums.indexOf(note2)) {
            var tmp = note1;
            note1 = note2;
            note2 = tmp;
        }

        //reflect sanity changes
        firstNote.value = note1;
        secondNote.value = note2;
        firstOctave.value = oct1;
        secondOctave.value = oct2;
        
        //first key -> end of first octave
        for (var j = whiteNoteEnums.indexOf(note1); j < whiteNoteEnums.length; j++) {
            whiteKeys.innerHTML += '<td>' + whiteNoteEnums[j] + oct1 + '</td>';
        }

        for (var j = whiteNoteEnums.indexOf(note1); j < blackNoteEnums.length; j++) {
            if (blackNoteEnums[j] !== null) {
                blackKeys.innerHTML += '<td>' + blackNoteEnums[j] + oct1 + '</td>';
            } else {
                blackKeys.innerHTML += "<td style='visibility: hidden'></td>";
            }
        }

        //2nd octave -> second to last octave
        for (var i = parseInt(oct1) + 1; i <= oct2-1; i++) {
            for (var j = 0; j < whiteNoteEnums.length; j++) {
                whiteKeys.innerHTML += '<td>' + whiteNoteEnums[j] + i + '</td>';
            }

            for (var j = 0; j < blackNoteEnums.length; j++) {
                if (blackNoteEnums[j] !== null) {
                    blackKeys.innerHTML += '<td>' + blackNoteEnums[j] + i + '</td>';
                } else {
                    blackKeys.innerHTML += "<td style='visibility: hidden'></td>";
                }
            }
        }

        //last octave -> last key
        for (var j = 0; j < whiteNoteEnums.indexOf(note2) + 1; j++) {
            whiteKeys.innerHTML += '<td>' + whiteNoteEnums[j] + oct2 + '</td>';
        }

        for (var j = 0; j < whiteNoteEnums.indexOf(note2); j++) {
            if (blackNoteEnums[j] !== null) {
                blackKeys.innerHTML += '<td>' + blackNoteEnums[j] + oct2 + '</td>';
            }
            else {
                blackKeys.innerHTML += "<td style='visibility: hidden'></td>";
            }
        }
        //assign the IDs (for clearing)
        for (var i = 0; i < whiteKeys.children.length; i++) {
            whiteKeys.children[i].id = whiteKeys.children[i].textContent;
        }

        for (var i = 0; i < blackKeys.children.length; i++) {
            blackKeys.children[i].id = blackKeys.children[i].textContent;
        }
    };

    keyboard.addEventListener('mousedown', function (e) {
        var target = e.target;
        if (target.tagName === 'TD') {
            if ((target.style.backgroundColor !== 'lightgrey') && (target.style.backgroundColor !== 'rgb(72,72,72)')) {
                selected.push(target.textContent);
                if (target.parentNode === whiteKeys) {
                    target.style.backgroundColor = 'lightgrey';
                } else {
                    target.style.backgroundColor = 'rgb(72,72,72)';
                }
            }

            handleKeyboard(target.textContent);
        }
    });

    keyboard.addEventListener('mouseup', function (f) {
        var target = f.target;
        if (target.tagName === 'TD') {   
            if (target.parentNode === whiteKeys) {
                target.style.backgroundColor = 'white';
            } else {
                target.style.backgroundColor = 'black';
            }
        }
    });

    function deselect () {
        for (var i = 0; i < selected.length; i++) {
            var tmp = document.getElementById(selected[i]);
            if (tmp.parentElement === whiteKeys) {
                tmp.style.backgroundColor = 'white';
            } else {
                tmp.style.backgroundColor = 'black';
            }
        }

        selected = [];
    };

    var keyboardShown = true;

    function toggleKeyboard() {
        if (keyboardShown) {
            keyboardHolder.style.display = 'none';
        } else {
            keyboardHolder.style.display = 'inline';
        }
     
        keyboardShown = !keyboardShown;
    };

    function handleKeyboard (key) {
        //Tone can't do special sharps, need # isntead of ♯
        var noSharp = key;
        if (key[1] === '♯') {
            noSharp = key[0] + '#' + key[2];
        }

        synth.triggerAttackRelease(noSharp, '8n');
    };  

    this._save1 = function(pitches) {
        console.log('generating keyboard pitches for: ' + pitches);
        var noteConversion = {'C': 'do', 'D': 're', 'E': 'mi', 'F': 'fa', 'G': 'sol', 'A': 'la', 'B': 'ti', 'R': 'rest'};
        var newStack = [[0, ['action', {'collapsed':false}], 100, 100, [null, 1, null, null]], [1, ['text', {'value':'chunk'}], 0, 0, [0]]];
        var endOfStackIdx = 0;
        for (var i = 0; i < pitches.length; i++) {
            var note = pitches[i].slice(0);

            // Add the Note block and its value
            var idx = newStack.length;
            newStack.push([idx, 'note', 0, 0, [endOfStackIdx, idx + 1, idx + 2, null]]);
            var n = newStack[idx][4].length;
            if (i === 0) {  // the action block
                newStack[endOfStackIdx][4][n - 2] = idx;
            } else {  // the previous note block
                newStack[endOfStackIdx][4][n - 1] = idx;
            }

            var endOfStackIdx = idx;
            newStack.push([idx + 1, ['number', {'value': '4'}], 0, 0, [idx]]);
            // Add the pitch blocks to the Note block
            var  notePitch = note.substring(0,note.length-1);  //i.e. D or D# not D#1
            var thisBlock = idx + 2;
     
            // We need to point to the previous note or pitch block.
            var previousBlock = idx;  // Note block
      
            // The last connection in last pitch block is null.
            var lastConnection = null;

            newStack.push([thisBlock, 'pitch', 0, 0, [previousBlock, thisBlock + 1, thisBlock + 2, lastConnection]]);
            if (['♯', '♭'].indexOf(notePitch[1]) !== -1) {
                newStack.push([thisBlock + 1, ['solfege', {'value': noteConversion[note[0]] + note[1]}], 0, 0, [thisBlock]]);
                newStack.push([thisBlock + 2, ['number', {'value': note[note.length-1]}], 0, 0, [thisBlock]]);
            } 
            else {
                newStack.push([thisBlock + 1, ['solfege', {'value': noteConversion[notePitch[0]]}], 0, 0, [thisBlock]]);
                newStack.push([thisBlock + 2, ['number', {'value': note[note.length-1]}], 0, 0, [thisBlock]]);
            }
        }
        console.log(newStack);
        this._logo.blocks.loadNewBlocks(newStack);
    }

    this.clearBlocks = function() {
        this._rowBlocks1 = [];
        this._colBlocks1 = [];
    };

    this.addRowBlock = function(pitchBlock) {
        this._rowBlocks1.push(pitchBlock);
    };

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    };

    this._addButton = function(row, icon, iconSize, label) {
        var cell = row.insertCell(-1);
        cell.innerHTML = '&nbsp;&nbsp;<img src="header-icons/' + icon + '" title="' + label + '" alt="' + label + '" height="' + iconSize + '" width="' + iconSize + '" vertical-align="middle" align-content="center">&nbsp;&nbsp;';
        cell.style.width = BUTTONSIZE + 'px';
        cell.style.minWidth = cell.style.width;
        cell.style.maxWidth = cell.style.width;
        cell.style.height = cell.style.width;
        cell.style.minHeight = cell.style.height;
        cell.style.maxHeight = cell.style.height;
        cell.style.backgroundColor = MATRIXBUTTONCOLOR;

        cell.onmouseover=function() {
            this.style.backgroundColor = MATRIXBUTTONCOLORHOVER;
        };

        cell.onmouseout=function() {
            this.style.backgroundColor = MATRIXBUTTONCOLOR;
        };

        return cell;
    };
};
