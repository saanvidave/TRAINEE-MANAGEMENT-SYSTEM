// Copyright (c) 2024, Trainee and contributors
// For license information, please see license.txt
var StartDate;
var EndDate;
var Duration;
var Status_change;

frappe.ui.form.on('Trainee', {
    before_insert: function (frm) {
        frm.set_value("placement_officer_contact_no", "+91-");
    },
	date_of_birth: function(frm){
        futuredate();
    },
    application_date: function(frm){
        futuredate();
    },
    starting_date: function(frm){
        futuredate();
    },
	first_name: function(frm){
        const capitalizedFirstName = capitalizeFirstLetter(frm.doc.first_name);
        frm.doc.first_name= capitalizedFirstName

        frm.refresh_fields();
        
    },
    last_name: function(frm){
        const capitalizedLastName = capitalizeFirstLetter(frm.doc.last_name);
        frm.doc.last_name= capitalizedLastName

        frm.refresh_fields();
    }, 
    middle_name: function(frm){
        const capitalizedMiddleName = capitalizeFirstLetter(frm.doc.middle_name);
        frm.doc.middle_name= capitalizedMiddleName

        frm.refresh_fields();
    },
    college_name: function(frm){
        var capitalizecollegename = capitalizeFirstLetter(frm.doc.college_name);
        frm.doc.college_name = capitalizecollegename
        frm.refresh_fields(); 
    },
	onload: function(frm) 
	{
		StartDate = frm.doc.starting_date;
        EndDate = frm.doc.ending_date;

        updateFields(frm);

    },
    starting_date: function(frm) {
		StartDate = frm.doc.starting_date;

        updateFields(frm);
    },

    ending_date: function(frm) {
		EndDate = frm.doc.ending_date;

        updateFields(frm);    
    },
	validate: function (frm) {
        frm.set_value('full_name', frm.doc.first_name + " " + frm.doc.last_name);
        
    }

}); 
function futuredate(inputString){
    if (frm.doc.date_of_birth > get_today()) {
        frappe.msgprint(__("You cannot select a future date "));
        frappe.validated = false;
    }
}
function capitalizeFirstLetter(inputString) {
    if (inputString) {
        return inputString.replace(/^./, inputString[0].toUpperCase());
    }
    return inputString;
}
function Status(frm) {
    

	var today = frappe.datetime.get_today();

    if (today >= StartDate && today <= EndDate) {
        Status_change = 'Active';
    } else if (today > EndDate) {
        Status_change = 'Completed';
    } else {
        Status_change = 'Not Started';
    }

    frm.set_value("status", Status_change);
}
function Duration(frm){
	   var todate = new Date(StartDate);
        var enddate = new Date(EndDate);
        
        var days = todate.getDate() - enddate.getDate();
        var months = enddate.getMonth() - todate.getMonth();
        
        frm.set_value("duration", months + " Month "+", "+  days + " Days");

	
}

function previousdate(frm) {
    if (EndDate && StartDate && EndDate < StartDate) {
        frappe.msgprint(__("Ending Date can't be before Starting Date."));
        frm.set_value('ending_date', '');
    } else {
        updateFields(frm);
    }
}

function updateFields(frm) {
    Duration(frm);
    Status(frm);
	previousdate(frm);
}