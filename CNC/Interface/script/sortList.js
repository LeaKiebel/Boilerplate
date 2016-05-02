
$(function sortList(id){
  $(id).data("sorter", false);

  $("table").tablesorter({

    headers: {
      '.first-name, .last-name' : {
        sorter: false
      }
    }
  });
});
