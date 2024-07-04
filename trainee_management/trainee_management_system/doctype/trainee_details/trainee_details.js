// Copyright (c) 2024, Trainee and contributors
// For license information, please see license.txt
var StartDate;
var EndDate;
// var Duration;
var applicationdate;
var Status_change;

frappe.ui.form.on('TRAINEE DETAILS', {
	before_insert: function (frm) {
        frm.set_value("contact_number", "+91-");
    },
    to_date: function(frm) {
        if (frm.doc.end_date < frappe.datetime.get_today()) {
            frm.set_value('status', 'COMPLETED');
        } else {
            frm.set_value('status', 'ACTIVE'); // Clear status if to_date is in the future
        }
    },

	date_of_birth: function(frm){
        futuredate();
    },
    application_date: function(frm){
        futuredate();
    },
    start_date: function(frm){
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
	country:function(frm){
		const capitalizedCountry = capitalizeFirstLetter(frm.doc.country);
        frm.doc.country= capitalizedCountry

        frm.refresh_fields();
	},
	state:function(frm){
		const capitalizedState = capitalizeFirstLetter(frm.doc.state);
        frm.doc.state= capitalizedState

        frm.refresh_fields();
	},
	city:function(frm){
		const capitalizedCity = capitalizeFirstLetter(frm.doc.city);
        frm.doc.city= capitalizedCity

        frm.refresh_fields();
	},
    middle_name: function(frm){
        const capitalizedMiddleName = capitalizeFirstLetter(frm.doc.middle_name);
        frm.doc.middle_name= capitalizedMiddleName

        frm.refresh_fields();
		
    },
    university_name: function(frm){
        var capitalizecollegename = capitalizeFirstLetter(frm.doc.university_name);
        frm.doc.university_name = capitalizecollegename
        frm.refresh_fields(); 
    },
   
 
	onload: function(frm) 
	{
		StartDate = frm.doc.start_date;
        EndDate = frm.doc.end_date;
        applicationdate = frm.doc.application_date;
        updateFields(frm);
		age(frm);
        if (frm.doc.start_date && frm.doc.end_date) {
            Duration(frm);
        }
    },
    application_date: function(frm){
        applicationdate = frm.doc.application_date;
        pd(frm);
      
    },
    start_date: function(frm) {
		StartDate = frm.doc.start_date;
        frm.refresh_fields(); 
        updateFields(frm);
    },
    end_date: function(frm) {
		EndDate = frm.doc.end_date;
        frm.refresh_fields(); 
        updateFields(frm);    
    },
	
	refresh: function age(frm) {
			
	    var dob = new Date(frm.doc.date_of_birth);
			if (isNaN(dob)) {
				console.error("Invalid date of birth:", frm.doc.date_of_birth);
				return;
			}
			var now = new Date();
			var age_now = now.getFullYear() - dob.getFullYear();
			
			
			if (now.getMonth() < dob.getMonth() || 
				(now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) {
				age_now--;
			}
        
    }, 
    refresh: function(frm) {
        Duration(frm);
        updateStatus(frm);
        Status(frm);
    },
	validate: function (frm) {
        frm.set_value('full_name', frm.doc.first_name + " " + frm.doc.middle_name + " " + frm.doc.last_name);
        Duration(frm);
        if (frm.doc.date_of_birth > get_today()) {
            frappe.msgprint(_("You cannot enter a future date"));
            frappe.validated = false;
        }
        var zip_code = frm.doc.zip_code;
        if (zip_code && !/\d{6}/.test(zip_code)) {
            frappe.msgprint(__("Enter a 6-digit Zipcode"));
            frappe.validated = false;
        }
    },
	date_of_birth: function(frm) {
        if (frm.doc.date_of_birth) {
            calculateAge(frm);
        } else {
            frm.set_value('age', ''); 
        }
    },
	onload: function(frm) {
        if (frm.doc.date_of_birth) {
            calculateAge(frm);
        }
        
	Duration(frm);
        
    },

}); 

function futuredate(inputString){
    if (frm.doc.date_of_birth > get_today()) {
        frappe.msgprint(__("You cannot select a future date "));
        frappe.validated = false;
		age();
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
    var StartDate=frm.doc.start_date;
    var EndDate=frm.doc.end_date;
    var Status_change;
    if (today >= frm.doc.start_date && today <= EndDate) {
        Status_change = 'ACTIVE';
    } else if (today > frm.doc.end_date) {
        Status_change = 'COMPLETED';
    } else {
        Status_change = 'NOT STARTED';
    }

    frm.set_value("status", Status_change);
}
function Duration(frm){
        console.log(frm.doc.start_date)
        console.log(StartDate)
	    var todate = new Date(frm.doc.start_date);
        var enddate = new Date(frm.doc.end_date);
        var timeDifference = Math.abs(enddate - todate);
        var days = Math.floor(timeDifference / (1000 * 3600 * 24));
        var months = Math.floor(days / 30);
        var remainingDays = days % 30;        
        frm.set_value("duration", months + " Month "+"," + " "+ remainingDays + " "+"days");
    
	
}
function calculateAge(frm) {
    var dob = new Date(frm.doc.date_of_birth);
    var now = new Date();
    var age_now = now.getFullYear() - dob.getFullYear();
    
    if (now.getMonth() < dob.getMonth() || 
        (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) {
        age_now--;
    }

    frm.set_value('age', age_now.toString()); 
}

function previousdate(frm) {
    if (EndDate && StartDate && EndDate < StartDate) {
        frappe.msgprint(__("Ending Date can't be before Starting Date."));
        frm.set_value('ending_date', '');
    } else {
        updateFields(frm);
    }
}
function pd(frm){
    if (joiningdate && applicationdate  < applicationdate) {
        frappe.msgprint(__("Joining Date can not be before Application Date."));
        frm.set_value('joining_date', '');
    } 
}

function updateFields(frm) {
    Duration(frm);
    Status(frm);
	previousdate(frm);
    
}
function updateStatus(frm) {
    var today = frappe.datetime.get_today();
    var toDate = frm.doc.to_date; // Replace with actual fieldname

    var status;
    if (frm.doc.end_date && frm.doc.end_date < today) {
        status = 'COMPLETED';
    } else {
        status = 'ACTIVE'; // Assuming default status if not completed
    }

    frm.set_value('status', Status);
}