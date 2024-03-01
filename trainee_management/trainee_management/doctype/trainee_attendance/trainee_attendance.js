// Copyright (c) 2024, Trainee and contributors
// For license information, please see license.txt

frappe.ui.form.on('Trainee Attendance', {
    refresh(frm) {
		frm.set_value("attendance_date", frappe.datetime.get_today());

	},
    
	validate: function(frm) {
		if (frm.doc.attendance_date > get_today()) {
			frappe.msgprint(__("Select Valid Date "));
			frappe.validated = false;
		}
	},
	onload: function(frm) {
		frm.toggle_display("half_day_status", false);

			},
		

	status: function(frm) {
		if (frm.doc.status == "Half Day") {
            frm.toggle_display("half_day_status", true);
            frm.set_df_property("half_day_status", "options", ["First Half", "Second Half"]);
        } else {
            frm.toggle_display("half_day_status", false);
        }
    }
});















