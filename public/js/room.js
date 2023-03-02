var gameSatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var moves = 0;
var myClick;
var otherClick;
const socket = io('/');
var enableClick = false;

document.getElementById('url').value = location;
const copyToClip = () => {
    copyText = document.getElementById('url');
    copyText.select();
    copyText.setSelectionRange(0, 9999);
    document.execCommand('copy');
    copyText.value = 'Copied';
    copyText.onclick = null;
    window.getSelection().removeAllRanges(); 
}