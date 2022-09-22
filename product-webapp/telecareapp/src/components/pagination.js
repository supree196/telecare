import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, active, page, preBack }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={{ marginTop: 10 }}>
            <div className="row mt-20">
                {/* <div className="col-sm-12 col-md-6 mb-20">
                    <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                    >
                    </div>
                </div> */}
                <div className="col-sm-12 col-md-6">
                    <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">
                            <li className={`paginate_button page-item ${active != 1 ? "active" : ""}`}>
                                <button
                                    disabled={active == 1}
                                    value={page}
                                    id={page}
                                    aria-controls="datatable"
                                    data-dt-idx="1"
                                    tabIndex="0"
                                    className={active != 1 ? "page-link color-white" : "page-link color-green"}
                                    onClick={() => preBack(active - 1)}
                                >
                                    prev
                                </button>
                            </li>
                            {pageNumbers.map((page, index) => {
                                return (
                                    <li
                                        className={`paginate_button page-item ${active === page ? "active" : "color-white'"
                                            }`}
                                    >
                                        <button
                                            key={index}
                                            value={page}
                                            id={page}
                                            aria-controls="datatable"
                                            data-dt-idx="1"
                                            tabIndex="0"
                                            className={`page-link ${active === page ? 'color-white' : 'color-green'}` }
                                            onClick={(e) => paginate(e)}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                )
                            })}
                            <li className={`paginate_button page-item ${active < pageNumbers.length ? "active" : "color-white'"}`}>
                                <button
                                    disabled={active > pageNumbers.length - 1}
                                    id={page}
                                    aria-controls="datatable"
                                    data-dt-idx="1"
                                    tabIndex="0"
                                    className={active < pageNumbers.length ? "page-link color-white" : "page-link color-green"}
                                    onClick={() => preBack(active + 1)}
                                >
                                    next
                                </button>
                            </li>                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;