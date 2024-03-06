// Copyright (c) 2024, Trainee and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Trainee Attendance Report"] = {
	"filters": [
		{
			"label": __("Trainee Name"),
			"fieldname": "trainee_name",
			"fieldtype": "Data",
			
		},
		{
			"label": __("From Date"),
           	"fieldname": "from_date",
            "fieldtype": "Date",
			"default": frappe.datetime.month_start()
           
		},
		{
			"label": __("To Date"),
            "fieldname": "to_date",
            "fieldtype": "Date",
			"default": frappe.datetime.month_end()
           
	           
		}
	]
};
