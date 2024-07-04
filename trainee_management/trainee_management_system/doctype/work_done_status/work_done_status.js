frappe.ui.form.on('WORK DONE STATUS', {
	validate: function(frm) {

		if (frm.doc.date > get_today()) {
			frappe.msgprint(__("Select Valid Date "));
			frappe.validated = false;
		}
	},
    refresh: function(frm) {
        // Apply initial styles on refresh
        var $completedWork = $('[data-fieldname="completed_work"]');
        $completedWork.css({
            'background-color': '#C0C0C0',  
            'color': '#343434',
			'font-weight': 'Bold',
			'font-size' : '15px'
        });
		var $traineename = $('[data-fieldname="trainee"]');
        $traineename.css({
           // 'background-color': '#7393B3	',  
            'color': '#343434',
			'font-weight': 'Medium',
			'font-size' : '15px'
        });
		var $date = $('[data-fieldname="date"]');
        $date.css({
           // 'background-color': '#7393B3	',  
            'color': '#343434',
			'font-weight': 'Medium',
			'font-size' : '15px'  
        });
		var $pendingwork = $('[data-fieldname="pending_work"]');
        $pendingwork.css({
            'background-color': '#C0C0C0',  
            'color': '#343434',
			'font-weight': 'Bold',
			'font-size' : '15px'  
        });
var fieldname = 'completed_work';  
var labelElement = $(cur_frm.fields_dict[fieldname].wrapper)
    .find('.control-label').css({
        'font-weight': 'bold',
        'font-size': '15px',
        'color': '#343434'  
    });
	var fieldname = 'trainee';  
var labelElement = $(cur_frm.fields_dict[fieldname].wrapper)
    .find('.control-label').css({
        'font-weight': 'bold',
        'font-size': '15px',
        'color': '#343434',
		'background-color':'#C0C0C0',
		'background-size': '50% auto',
        'width': '100%'
    });
	var fieldname = 'pending_work';  
    var labelElement = $(cur_frm.fields_dict[fieldname].wrapper)
    .find('.control-label').css({
        'font-weight': 'bold',
        'font-size': '15px',
        'color': '#343434'  
    });
	var fieldname = 'date';  
    var labelElement = $(cur_frm.fields_dict[fieldname].wrapper)
    .find('.control-label').css({
        'font-weight': 'bold',
        'font-size': '15px',
        'color': '#343434',
		'background-color':'#C0C0C0',
		'background-size': '50% auto',
        'width': '100%'
    });
	
	
	}
        
    }
);

