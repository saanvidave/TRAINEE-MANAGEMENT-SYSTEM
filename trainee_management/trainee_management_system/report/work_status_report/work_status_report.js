// Copyright (c) 2024, Trainee and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["WORK STATUS REPORT"] = {
	"filters": [
	
		{
			"label": __("NAME"),
			"fieldname": "trainee",
			"fieldtype": "Data",
			
		},
		{
			"label": __("FROM DATE"),
           	"fieldname": "from_date",
            "fieldtype": "Date",
			"default": frappe.datetime.month_start()
           
		},
		{
			"label": __("TO DATE"),
            "fieldname": "to_date",
            "fieldtype": "Date",
			"default": frappe.datetime.month_end()       
		},
		
	]
};

