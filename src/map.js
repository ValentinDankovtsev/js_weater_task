
 export function createUrlImg(result) {
    const city = result
    const imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk`;
    return imgUrl;
}

export function drawImg() {
    document.querySelector('.img').src = createUrlImg(); 
}
 ;
