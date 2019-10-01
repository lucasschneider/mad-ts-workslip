(function(){
  'use strict';
  let contentDoc = document.getElementById('staff-iframe');
  let data = {"dateToday": (new Date()).toLocaleDateString(), "rush": false};

  if (contentDoc) {
    contentDoc = contentDoc.contentWindow.document.getElementById('frame').contentWindow.document;

    let title = contentDoc.getElementById('pou-title');
    data.title = title ? title.value : '';
    let author = contentDoc.getElementById('pou-author');
    data.author = author ? author.value : '';
    let ean13 = contentDoc.getElementById('pou-EAN13');
    data.ean13 = ean13 ? ean13.value : '';
    let isbn = contentDoc.getElementById('pou-ISBN');
    data.isbn = isbn ? isbn.value : '';
    let issn = contentDoc.getElementById('pou-ISSN');
    data.issn = issn ? issn.value : '';
    let ismn = contentDoc.getElementById('pou-ISMN');
    data.ismn = ismn ? ismn.value : '';
    let upc = contentDoc.getElementById('pou-UPC');
    data.upc = upc ? upc.value : '';
    let manufactNum = contentDoc.getElementById('pou-manufacturer_number');
    data.manufactNum = manufactNum ? manufactNum.value : '';
    let supplierNum = contentDoc.getElementById('pou-supplier_number');
    data.supplierNum = supplierNum ? supplierNum.value : '';
    let publisher = contentDoc.getElementById('pou-publisher');
    data.publisher = publisher ? publisher.value : '';
    let listPrice = contentDoc.getElementById('pou-list_price');
    data.listPrice = listPrice ? listPrice.value : '';
    let discountedPrice = contentDoc.getElementById('pou-discounted_price');
    data.discountedPrice = discountedPrice ? discountedPrice.value : '';
    let datePub = contentDoc.getElementById('pou-date_of_publication');
    data.datePub = datePub ? datePub.value : '';
    let edition = contentDoc.getElementById('pou-edition');
    data.edition = edition ? edition.value : '';
    let description = contentDoc.getElementById('pou-description');
    data.description = description ? description.value : '';
    let bibRecId = contentDoc.getElementById('pou-bibliographic_record_id');
    data.bibRecId = bibRecId ? bibRecId.value : '';
    let getitCopies = /\d+ Copies/.exec(contentDoc.querySelector('.active div[ng-controller="PurchaseOrderLinesUpdateCtrl"]').textContent);
    data.getitCopies = getitCopies.length === 1 ? /\d+/.exec(getitCopies[0])[0] : '?';
    let orderLineRef = contentDoc.getElementById('pou-order_line_reference');
    if (orderLineRef && orderLineRef.value.length > 0) {
      data.orderLineRef = orderLineRef.value;
      if (/[^a-z]*rush[^a-z]*/i.test(orderLineRef.value)) {
        data.rush = true;
      }
      let orderLineRefParts = orderLineRef.value.split('-');
      orderLineRefParts.pop();
      data.poNum = orderLineRefParts.join('-');
    } else {
      data.orderLineRef = '';
      data.poNum = '';
    }

    let rushCheckbox = contentDoc.getElementById('pou-rush');
    if (rushCheckbox.checked) data.rush = true;

    data.copies = [];
    let rows = contentDoc.querySelectorAll('#polc-index div[ui-grid-row="row"]');

    if (rows) {
      rows = Array.from(rows).filter((v,i) => {return i >= rows.length/2});
      for (let row of rows) {
        let copy = {};

        copy.copyLoc = row.children[1].textContent.trim();
        copy.receiptStatus = row.children[3].textContent.trim().substring(0,3) + '\'d';
        copy.staffNote = row.children[5].textContent.trim();

        if (/[^a-z]*rush[^a-z]*/i.test(copy.staffNote)) {
          data.rush = true;
        }

        data.copies.push(copy);
      }

      data.copies.sort((a,b) => {return a.copyLoc > b.copyLoc ? 1 : b.copyLoc > a.copyLoc ? -1 : 0;});
    }
  }
  return data;
})();
