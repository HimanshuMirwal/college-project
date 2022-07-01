import react from "react";

const Pagination = ({postPerPage, TotalPosts, Paginate})=>{
    const PageNumbers=[];
    for(let index=1; index<=Math.ceil(TotalPosts/postPerPage); index++){
        PageNumbers.push(index)
    }
    return(

        // <nav aria-label="Page navigation">
  <ul class="pagination  justify-content-center my-1">
        {
            PageNumbers.map(number=>{
                return     <li class="page-item page-link" style={{color:"#6A9C78"}} onClick={()=>Paginate(number)} key={number}>
                {number}
                </li>

            })
        }

  </ul>
// </nav>
    )
}
export default Pagination;