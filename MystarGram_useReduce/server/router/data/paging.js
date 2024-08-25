
let paging = {
    page:1,
    totalCount : 0,
    beginPage : 0,
    endPage:0,
    displayRow:10,
    displayPage : 10,
    prev : false,
    next : false,
    startNum : 0,
    endNum : 0,
    calPaging: function(){
        this.endPage = Math.ceil(this.page/this.displayPage) * this.displayPage;
        this.beginPage = this.endPage - (this.displayPage-1);
        let totalPage = Math.ceil(this.totalCount/this.displayPage);
        if(totalPage<this.endPage){
            this.endPage = totalPage;
            this.next = false;
        }else{
            this.next = true;
        }
        this.prev = (this.beginPage == 1) ? false : true;
        this.startNum = (this.page-1)*this.displayRow+1;
        this.endNum = this.page * this.displayRow+1;
        console.log(this.page );
    }
}

module.exports = paging;