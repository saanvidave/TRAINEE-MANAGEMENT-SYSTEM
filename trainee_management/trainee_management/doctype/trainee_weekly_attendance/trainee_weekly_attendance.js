// Copyright (c) 2024, Trainee and contributors
// For license information, please see license.txt

frappe.ui.form.on('Trainee Weekly Attendance', {
    refresh: function(frm){
        cur_frm.fields_dict['attendance_details'].grid.wrapper.find('.grid-remove-rows').hide();
        cur_frm.fields_dict['attendance_details'].grid.wrapper.find('.btn-open-row').hide();

    },

    mark_attendance: function(frm) {
        frm.call({
			method: "generate_attendance",
			doc: frm.doc,
			freeze: true,
			callback: function() {
				// frappe.msgprint(__("Table Completed"));
			}
		})
        
    },
    
    
    onload: function(frm) {
        
        const today = new Date();

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const startOfWeekStr = startOfWeek.toISOString().slice(0, 10);
        const endOfWeekStr = endOfWeek.toISOString().slice(0, 10);

        frm.set_value("from_date",startOfWeekStr);
        frm.set_value("to_date",endOfWeekStr)

        
        frm.fields_dict['attendance_details'].grid.cannot_add_rows = true;
        frm.fields_dict.attendance_details.grid.grid_buttons.addClass('hidden');


        },
        
        
    });  

















    






        // },
        // refresh: function(frm) {
        //         frm.add_custom_button(__('Generate Attendance'), function() {
        //             frm.events.generateAttendance(frm);
        //         });
        //     },
        
        //     generateAttendance: function(frm) {
        //         frappe.call({
        //             method: 'Trainee Management.trainee_weekly_attendance.generate_attendance',  
        //             args: {
        //                 docname: frm.docname  
        //                             },
        //             callback: function(response) {
        //             }
        //         });
        //     }
        

           
            
    

    























































            
        //  frm.set_value("from_date",frappe.datetime.add_to_date(weeks=1));
        //  frm.set_value("to_date",frappe.datetime.add_days(frappe.datetime.nowdate(), 7))
                // Get today's date
          
            // Set "from_date" to today's date
           // frm.set_value("from_date", frappe.datetime.nowdate());
    
            // Set "to_date" to today + 7 days
           // frm.set_value("to_date", frappe.datetime.add_days(frappe.datetime.nowdate(), 7));
            
            // Get today's date
        //     var today = frappe.datetime.nowdate();
        //     //console.log("today");
    
        //     // Calculate the start of the current week (Monday)
        //     var start_of_week = frappe.datetime.add_days(today, -frappe.datetime.get_day(today) + 1);
    
        //     // Calculate the end of the current week (Sunday)
        //     var end_of_week = frappe.datetime.add_days(start_of_week, 6);
    
        //     // Format the dates as strings in the desired format (e.g., YYYY-MM-DD)
        //     var start_of_week_str = frappe.datetime.format(start_of_week, 'yyyy-MM-dd');
        //     frappe.msgprint(start_of_week_str)
        //     var end_of_week_str = frappe.datetime.format(end_of_week, 'yyyy-MM-dd');
        //     //frappe.throw("start_of_week_str")
        //     //frm.set_value("from_date",start_of_week_str );

        //     console.log("Start of the week (Monday):", start_of_week_str);
        //     console.log("End of the week (Sunday):", end_of_week_str);
        // }
        
  


   

        