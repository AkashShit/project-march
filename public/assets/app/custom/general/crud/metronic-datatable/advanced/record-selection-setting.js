"use strict";
// Class definition
var KTDatatableSetting = function () {
  // alert('hfhfh');
  // Private functions
  var options = {
    // datasource definition
    data: {
      type: 'remote',
      source: {
        read: {
          url: `${location.protocol}//${window.location.host}/setting/getall`,
        },
      },
      pageSize: 10,
      serverPaging: true,
      serverFiltering: true,
      serverSorting: true,
    },

    // layout definition
    layout: {
      scroll: true, // enable/disable datatable scroll both horizontal and
      // vertical when needed.
      height: 500, // datatable's body's fixed height
      footer: false // display/hide footer
    },

    // column sorting
    sortable: true,

    pagination: true,

    // columns definition

    columns: [{
        field: 'setting_name',
        title: 'Info Type',
        sortable: false,
        template: '{{setting_name}}'
      },
      {
        field: 'setting_value',
        title: 'Site Details',
        sortable: false,
        template: '{{setting_value}}'
      },
      {
        field: 'Actions',
        title: 'Actions',
        sortable: false,
        width: 110,
        overflow: 'visible',
        textAlign: 'left',
        autoHide: false,
        template: function (row) {
          return '\
                    \<a href="' + location.protocol + "//" + window.location.host + '/setting/edit/' + row._id + '" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                        <i class="flaticon-edit"></i>\
                    </a>\
                ';
        },
      }
    ],
  };

  // basic demo
  var settingSelector = function () {

    options.search = {
      input: $('#generalSearch'),
    };

    var datatable = $('#settingRecordSelection').KTDatatable(options);

    $('#kt_form_status').on('change', function () {
      datatable.search($(this).val(), 'Status');
    });

    $('#kt_form_type').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Type');
    });

    $('#kt_form_status,#kt_form_type').selectpicker();

    datatable.on(
      'kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated',
      function (e) {
        var checkedNodes = datatable.rows('.kt-datatable__row--active').nodes();
        var count = checkedNodes.length;
        $('#kt_datatable_selected_number').html(count);
        if (count > 0) {
          $('#kt_datatable_group_action_form').collapse('show');
        } else {
          $('#kt_datatable_group_action_form').collapse('hide');
        }
      });

    $('#kt_modal_fetch_id').on('show.bs.modal', function (e) {
      var ids = datatable.rows('.kt-datatable__row--active').
      nodes().
      find('.kt-checkbox--single > [type="checkbox"]').
      map(function (i, chk) {
        return $(chk).val();
      });
      var c = document.createDocumentFragment();
      for (var i = 0; i < ids.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-id', ids[i]);
        li.innerHTML = 'Selected record ID: ' + ids[i];
        c.appendChild(li);
      }
      $(e.target).find('.kt-datatable_selected_ids').append(c);
    }).on('hide.bs.modal', function (e) {
      $(e.target).find('.kt-datatable_selected_ids').empty();
    });

    $(document).on('click', '.ktDelete', function () {
      var elemID = $(this).attr('id').replace('del-', '');
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(function (result) {
        if (result.value) {
          window.location.href = `${location.protocol}//${window.location.host}/setting/delete/${elemID}`;
        }
      });
    });
  };



  return {
    // public functions
    init: function () {
      settingSelector();
    },
  };
}();

jQuery(document).ready(function () {
  KTDatatableSetting.init();
});