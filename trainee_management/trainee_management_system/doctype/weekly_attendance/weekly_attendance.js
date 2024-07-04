// Copyright (c) 2024, Trainee and contributors
// For license information, please see license.txt

frappe.ui.form.on('WEEKLY ATTENDANCE', {
    refresh: function(frm){
        cur_frm.fields_dict['attendance_details'].grid.wrapper.find('.grid-remove-rows').hide();
        cur_frm.fields_dict['attendance_details'].grid.wrapper.find('.btn-open-row').hide();
        var fieldname = 'mark_the_attendance';  // Replace with your actual fieldname
        var buttonElement = cur_frm.fields_dict[fieldname].$input;

        // Apply CSS styles directly to the button
        $(buttonElement).css({
            'background-color': '#7393B3',
            'color': '#343434',
            'font-weight': 'bold',
            'font-size': '15px',
            'border-radius': '25px',
            'border': '2px solid #73AD21',
            'width': '40%',  // Adjust width as needed
            'padding': '10px 20px' ,
            'border-style': 'solid',
            'border-color': 'black'
        });

    },
    from_date: function(frm){
        // const today = new Date();
        // const startOfWeek = new Date(today);
        // startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        // const startOfWeekStr = startOfWeek.toISOString().slice(0, 10);
        // frm.set_value("from_date",startOfWeekStr);
    },
    to_date: function(frm){
        const today = new Date();
        // const endOfWeek = new Date(startOfWeek);
        // endOfWeek.setDate(startOfWeek.getDate() + 6);
        // const endOfWeekStr = endOfWeek.toISOString().slice(0, 10);
        // frm.set_value("to_date",endOfWeekStr)
    },
    
   
  
    mark_the_attendance: function(frm) {
        frm.call({
			method: "generate_attendance",
			doc: frm.doc,
			freeze: true,
			callback: function() {
				// frappe.msgprint(__("Table Completed"));
			}
		})
        
    },
   
    onload : function(frm) {
        if (frm.doc.__islocal){
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        const startOfWeekStr = startOfWeek.toISOString().slice(0, 10);
        frm.set_value("from_date",startOfWeekStr);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const endOfWeekStr = endOfWeek.toISOString().slice(0, 10);
        frm.set_value("to_date",endOfWeekStr)
    }
         
        frm.fields_dict['attendance_details'].grid.cannot_add_rows = true;
        frm.fields_dict.attendance_details.grid.grid_buttons.addClass('hidden');

        },      
    });  
