import frappe
from frappe.model.document import Document
from frappe import _
from frappe.utils import get_weekday, getdate, add_days
from datetime import datetime, timedelta

class WEEKLYATTENDANCE(Document):
    @frappe.whitelist()
    def generate_attendance(self):
        self.test_generate_attendance()

    @frappe.whitelist()
    def test_generate_attendance(self):
        if not self.from_date or not self.to_date:
            frappe.throw("Please select both 'From Date' and 'To Date'")
        
        start_of_week = getdate(self.from_date)
        end_of_week = start_of_week + timedelta(days=(6 - start_of_week.weekday()))

        to_date = getdate(self.to_date)
        
        if to_date < start_of_week or to_date > end_of_week:
            frappe.throw("You can only mark attendance for dates within the current week.")

        self.set("attendance_details", [])
        details = []
        current_date = start_of_week
        while current_date <= to_date:
            day_name = get_weekday(current_date)
            details.append({
                "attendance_date": current_date,
                "day": day_name,
                "status": "ABSENT"  # Assuming all default to Absent
            })
            current_date = add_days(current_date, 1)
        
        self.set('attendance_details', details)

    def validate(self):
        if not self.is_new():
            return
        
        # Validate trainee status
        trainee_status = frappe.get_value("TRAINEE DETAILS", self.trainee_name, "status")
        if trainee_status != "ACTIVE":
            frappe.throw(_("Trainee is not active. Cannot fill attendance."))

        # Check for existing attendance record for the same week
        existing_record = frappe.get_all("WEEKLY ATTENDANCE",
            filters={'trainee_name': self.trainee_name, 
                     'from_date': self.from_date,
                     'to_date': self.to_date,
                     'name': ['!=', self.name]})

        if existing_record:
            frappe.throw(_("Attendance has already been recorded for this week."))

