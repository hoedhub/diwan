var acc=document.getElementsByClassName("accordion"), accqsd=document.getElementsByClassName("accqsd");

/* function */
var filtered=false;
function resetFilter() {
  var filt = document.getElementById('filter').value;
  if(filtered &&(filt==""||filt=="undefined"||filt==null)){
    for(i=0;i<accqsd.length;i++){
      accqsd[i].style.display="block";
      tr = accqsd[i].getElementsByTagName("tr");
      for(r=0;r<tr.length;r++){
        td = tr[r].getElementsByTagName("td");
        for(d=0;d<td.length;d++){
          while(td[d].innerHTML.indexOf('span')>-1){
            res=td[d].innerHTML.replace("<span class=\"searchRes\">","").replace("</span>","");
            td[d].innerHTML=res;
          }
        }
      }
    }
    filtered=false;
  }
}
function filterize() {
  var found, resCount=0, searchRes=[], filt = document.getElementById('filter').value,
  strippedF = stripTashkeel(filt);
  if(!filt || filt === ""){return;}
  searchRes.length=0;
  for(i=0;i<accqsd.length;i++){
    found=false;
    tr = accqsd[i].getElementsByTagName("tr");
    for(r=0;r<tr.length;r++){
      td = tr[r].getElementsByTagName("td");
      for(d=0;d<td.length;d++){
        while(td[d].innerHTML.indexOf('span')>-1){
          res=td[d].innerHTML.replace("<span class=\"searchRes\">","").replace("</span>","");
          td[d].innerHTML=res;
        }
        tdSplit=td[d].innerHTML.split(' ');
        tmpSplit=td[d].innerHTML.split(' ');
        for(s=0;s<tdSplit.length;s++){
          strippedQ = stripTashkeel(tdSplit[s]);
          if(strippedQ.indexOf(strippedF) >-1){
            found=true;
            resCount++;
            res = "<span class=\"searchRes\">"+tdSplit[s]+"</span>";
            tmpSplit[s]=res;
           searchRes.push('<tr><td>'+resCount+'~ </td><td>'+accqsd[i].innerHTML.substring(37, accqsd[i].innerHTML.indexOf(')')+1)+'</td></tr><tr><td></td><td>رقم البيت : '+(r+1)+'- '+tmpSplit.join(' ')+'</td</tr><tr><td colspan=2><hr></td></tr>');
            tmpSplit[s] = tdSplit[s]
            tdSplit[s] = res;
          }
        }
        td[d].innerHTML=tdSplit.join(' ');
      }
    }
    if(found){
      accqsd[i].style.display="block";
    }else{
      accqsd[i].style.display="none";
    }
  }
  if(searchRes.length>0){
      document.getElementById('searchRes').innerHTML = '<h3>نتيجة البحث عن [ '+filt+' ] :</h3>في '+resCount+' موطن / مواطن<br /><table>'+searchRes.join('')+'</table>';
    }else{
      document.getElementById('searchRes').innerHTML = '<h3>نتيجة البحث عن [ '+filt+' ] :</h3><br />لا شيء';
    }
  filtered=true;
}
for(var i=0; i<96; i++) {
  id=i.toString().length==2?i:'0'+i;
  var mainContent = document.getElementById('main');
  if(!id){alert("Can't find the element [main]");break;}
  mainContent.innerHTML+='<div class="accqsd"><button id="acc'+id+'" class=accordion></button><div class="panel" id="qsd'+id+'"></div></div>';
  appendScript(mainContent, id+'.js');
}  
  for(var i=0; i<acc.length; i++) {
    acc[i].addEventListener("click", 
    function() {
      this.classList.toggle("active");
      var panel=this.nextElementSibling;
      if(panel.style.display==="block") {
        panel.style.display="none";
      }else{ 
        panel.style.display="block";
      }
    });
  }
  
var panel = document.getElementsByClassName("panel"),
  topbarHeight = document.getElementById("navbar").clientHeight;
  
  window.onscroll=function(){
    for(i=0; i<panel.length; i++) {
      qsdHeight = panel[i].clientHeight;
      qsdTop = panel[i].offsetTop;
      headerHeight = acc[i].clientHeight;
      sticky = window.pageYOffset+topbarHeight+headerHeight;
      if(panel[i].style.display === "block" && sticky >= qsdTop && qsdTop+qsdHeight >= sticky){
        acc[i].style.position="fixed";
        acc[i].style.top=topbarHeight+"px";
        acc[i].style.width="100%";
      }else{
        acc[i].removeAttribute("style");
      }
    }
  };
  
  function isCharTashkeel(letter) {
  if (typeof(letter) == "undefined" || letter == null)
    return false;
    
  var CHARCODE_SHADDA = 1617;
  var CHARCODE_SUKOON = 1618;
  var CHARCODE_SUPERSCRIPT_ALIF = 1648;
  var CHARCODE_TATWEEL = 1600;
  var CHARCODE_ALIF = 1575;

  var code = letter.charCodeAt(0);
//1648 - superscript alif
//1619 - madd: ~
  return (code == CHARCODE_TATWEEL || code == CHARCODE_SUPERSCRIPT_ALIF || code >= 1612 && code <= 1631);//tashkeel
}

function stripTashkeel(input) {
  var output = "";
  //todo consider using a stringbuilder to improve performance
  for (var i = 0; i < input.length; i++) {
    var letter = input.charAt(i);
    if (!isCharTashkeel(letter)) //tashkeel 
      output += letter;
  }
  return output;
}
function resizeFont(className, fntSize) {
  elm = document.getElementsByClassName(className);
  for(i=0; i<elm.length; i++) {
    elm[i].style="font-size:"+fntSize+"px";
  }
}
function increaseFontSizeBy(elemID,increment) {
  var el = document.getElementById(elemID); 
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style); // now you have a proper float for the font size (yes, it can be a float, not just an integer)
  el.style.fontSize = (fontSize + increment)
}
function decreaseFontSizeBy(elemID,decrement) {
  var el = document.getElementById(elemID); 
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style); // now you have a proper float for the font size (yes, it can be a float, not just an integer)
  el.style.fontSize = (fontSize - decrement)
}
function openNav() {
    document.getElementById("mySidenav").style.width = "180px";
}

function closeNav() {
  /*lonKhotChange();
  lonKholfChange();
  lonBahsChange();*/
    document.getElementById("mySidenav").style.width = "0";
}
function openClr(idName) {
    document.getElementById(idName).style.display = "block";
}

function closeClr(idName) {
    document.getElementById(idName).style.display = "none";
}

function loadColKhot(){
  var colKhotR = Number(getCookie("lonKhotR")), colKhotG = Number(getCookie("lonKhotG")), colKhotB = Number(getCookie("lonKhotB"));
  if(colKhotR){
    //lonKhot.color.rgb = { r: colKhotR, g:  colKhotG, b: colKhotB };
    return 'rgb(' + colKhotR + ', ' + colKhotG + ', ' + colKhotB+')';
  }else
  {
    return "rgb(0, 0, 0)";
  }
}
//lonKhot.on("mount", loadColKhot);

function loadColKholf(){
  var colKholfR =   Number(getCookie("lonKholfR")), colKholfG =  Number(getCookie("lonKholfG")), colKholfB = Number(getCookie("lonKholfB"));
  if(colKholfR){
    //lonKholf.color.rgb = { r: colKholfR, g: colKholfG, b: colKholfB };
    return 'rgb(' + colKholfR + ', ' + colKholfG + ', ' + colKholfB+')';
  }else
  {
    return "rgb(255, 255, 255)";
  }
}
//lonKholf.on("mount", loadColKholf);

function loadColBahs(){
  var colBahsR =   Number(getCookie("lonBahsR")), colBahsG =  Number(getCookie("lonBahsG")), colBahsB = Number(getCookie("lonBahsB"));
  if(colBahsR){
    //lonBahs.color.rgb = { r: colBahsR, g: colBahsG, b: colBahsB };
    return 'rgb(' + colBahsR + ', ' + colBahsG + ', ' + colBahsB+')';
  }else
  {
    return "rgb(255, 253, 0)";
  }
}
//lonBahs.on("mount", loadColBahs);

var lonKhot = new iro.ColorPicker("#lonKhot", {
    width: 180,
    height: 180,
    right: 2,
    position: "absolute",
    markerRadius: 8,
    color: loadColKhot(),
    borderWidth: 1,
    padding: 1,
    anticlockwise: true,
    css: {
      /*body: {
        "background-color": "$color",
        "color": "$color"
      },*/
      ".qsd": {
        "color": "$color"
      }
   }
  });

var lonKholf = new iro.ColorPicker("#lonKholf", {
    width: 180,
    height: 180,
    right: 2,
    position: "absolute",
    markerRadius: 8,
    color: loadColKholf(),
    borderWidth: 1,
    padding: 1,
    anticlockwise: true,
    css: {
      ".qsd": {
        "background-color": "$color"
      }
   }
});

var lonBahs = new iro.ColorPicker("#lonBahs", {
    width: 180,
    height: 180,
    right: 2,
    position: "absolute",
    markerRadius: 8,
    color: loadColBahs(),
    borderWidth: 1,
    padding: 1,
    anticlockwise: true,
    css: {
      /*body: {
        "background-color": "$color",
        "color": "$color"
      },*/
      ".searchRes": {
        "background-color": "$color"
      }
   }
  });

function lonKhotChange(color){
  setCookie('lonKhotR',color.rgb.r.toString(),3665);
  setCookie('lonKhotG',color.rgb.g.toString(),3665);
  setCookie('lonKhotB',color.rgb.b.toString(),3665);
}
lonKhot.on("color:change", lonKhotChange);

function lonKholfChange(color){
  setCookie('lonKholfR',color.rgb.r.toString(),3665);
  setCookie('lonKholfG',color.rgb.g.toString(),3665);
  setCookie('lonKholfB',color.rgb.b.toString(),3665);
}
lonKholf.on("color:change", lonKholfChange);

function lonBahsChange(color){
  setCookie('lonBahsR',color.rgb.r.toString(),3665);
  setCookie('lonBahsG',color.rgb.g.toString(),3665);
  setCookie('lonBahsB',color.rgb.b.toString(),3665);
}
lonBahs.on("color:change", lonBahsChange);

/*var lastCookie;
setInterval(
  function(){
    if(lastCookie!=document.cookie){
      alert("cookie changed!\nlast cookie: " + lastCookie+"\ncurr cookie: " + document.cookie);
      lastCookie=document.cookie;
    }
  },100
);*/

function resetColors() {
  if(!confirm('متأكد بقيام إعادة ضبط الألوان ؟'))
    return;
  eraseCookie("lonKhotR");
  eraseCookie("lonKhotG");
  eraseCookie("lonKhotB");
  eraseCookie("lonKholfR");
  eraseCookie("lonKholfG");
  eraseCookie("lonKholfB");
  eraseCookie("lonBahsR");
  eraseCookie("lonBahsG");
  eraseCookie("lonBahsB");
  lonKhot.color.rgb = { r: 0, g: 0, b: 0 };
  lonKholf.color.rgb = { r: 255, g: 255, b: 255 };
  lonBahs.color.rgb = { r: 255, g: 223, b: 0 }
}
 
function appendScript(parent, source) {
  var script = document.createElement("script"); // Make a script DOM node
  script.src = "assets/"+source; // Set it's src to the provided URL 
  parent.appendChild(script); // Add it to the end of the parent section of the page (could change 'head' to 'body' to add it to the end of the body section instead) }
}
var modal = document.querySelector(".modal"); var trigger = document.querySelector(".trigger"); var closeButton = document.querySelector(".close-button"); function toggleModal() { modal.classList.toggle("show-modal"); } function windowOnClick(event) { if (event.target === modal) { toggleModal(); } } trigger.addEventListener("click", toggleModal); closeButton.addEventListener("click", toggleModal); window.addEventListener("click", windowOnClick);

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();     date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + ";";//path=/";
}

function getCookie(name) { var nameEQ = name + "="; var ca = document.cookie.split(';'); for(var i=0;i < ca.length;i++) { var c = ca[i]; while (c.charAt(0)==' ') c = c.substring(1,c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); } return null; } function eraseCookie(name) { document.cookie = name+'=; Max-Age=-99999999;'; }

document.getElementById("filter").addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
  }
});

divs=document.getElementsByTagName("DIV");
for(i=0;i<divs.length;i++){
  divs[i].setAttribute("onselectstart", "return false");
}