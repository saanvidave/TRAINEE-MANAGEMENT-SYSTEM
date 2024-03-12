# Copyright (c) 2024, Trainee and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

class TraineeWeeklyAttendance(Document):
    @frappe.whitelist()
    def generate_attendance(self):
            
        self.test_generate_attendance()

    @frappe.whitelist()
    def test_generate_attendance(self):
        if not self.from_date or not self.to_date:
            frappe.throw("Please select both 'From Date' and 'To Date'")
            
        self.set("attendance_details", [])
        details = []
        current_date = self.from_date
        while current_date <= self.to_date:
            details.append({"attendance_date": current_date, "status": "Absent"})
            current_date = frappe.utils.add_days(current_date, 1)
        self.set('attendance_details', details)

       # frappe.msgprint("Now you can select Attendance status")
    def validate(self):
        if not self.is_new():
            return

        
        trainee_status = frappe.get_value("Trainee", self.name1, "status")
        if trainee_status != "Active":
            frappe.throw(_("Trainee is not active. Cannot fill attendance."))
     
    
        existing_record = frappe.get_all("Trainee Weekly Attendance",
            filters={'name1': self.name1, 
                     'from_date': self.from_date,
                     'to_date': self.to_date,
                     'name': ['!=', self.name]})

        if existing_record:
            frappe.throw(_("Your Attendance has already been recorded for this week."))
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        # existing_record = frappe.get_all("Trainee Weekly Attendance",
        #     filters={'trainee_name': self.trainee_name, 
        #              'attendance_date': self.attendance_date,
        #              'name': ['!=', self.name]})

        # if existing_record:
        #     frappe.throw(_("Your Attendance has already been recorded for this date."))

 
