from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
# Create your models here.
class Users(AbstractUser):
    email=models.EmailField(unique=True)
    phone=models.CharField(max_length=15,blank=True,null=True)
    address=models.TextField()
    city=models.CharField(max_length=50,blank=True,null=True)
    state=models.CharField(max_length=50,blank=True,null=True)
    pincode=models.CharField(max_length=10,blank=True,null=True)
    country=models.CharField(max_length=50,blank=True,null=True,default='India',choices=(('India','India'),('USA','USA'),('UK','UK'),('Australia','Australia'),('Canada','Canada'),('Germany','Germany'),('France','France'),('Italy','Italy'),('Japan','Japan'),('China','China'),('Russia','Russia'),('Brazil','Brazil'),('South Africa','South Africa'),('Nigeria','Nigeria'),('Mexico','Mexico'),('Argentina','Argentina'),('Spain','Spain'),('Portugal','Portugal'),('Greece','Greece'),('Sweden','Sweden'),('Norway','Norway'),('Finland','Finland'),('Denmark','Denmark'),('Netherlands','Netherlands'),('Belgium','Belgium'),('Switzerland','Switzerland'),('Austria','Austria'),('Poland','Poland'),('Czech Republic','Czech Republic'),('Turkey','Turkey'),('Ukraine','Ukraine'),('Hungary','Hungary'),('Romania','Romania'),('Bulgaria','Bulgaria'),('Croatia','Croatia'),('Slovenia','Slovenia'),('Slovakia','Slovakia'),('Lithuania','Lithuania'),('Latvia','Latvia'),('Estonia','Estonia'),('Ireland','Ireland'),('Scotland','Scotland'),('Wales','Wales'),('Northern Ireland','Northern Ireland'),('New Zealand','New Zealand'),('Singapore','Singapore'),('Malaysia','Malaysia'),('Thailand','Thailand'),('Indonesia','Indonesia'),('Philippines','Philippines'),('Vietnam','Vietnam'),('South Korea','South Korea'),('North Korea','North Korea'),('Taiwan','Taiwan'),('Hong Kong','Hong Kong'),('Macau','Macau'),('Bangladesh','Bangladesh'),('Pakistan','Pakistan'),('Sri Lanka','Sri Lanka'),('Nepal','Nepal'),('Bhutan','Bhutan'),('Maldives','Maldives'),('Afghanistan','Afghanistan'),('Iran','Iran'),('Iraq','Iraq'),('Syria','Syria'),('Lebanon','Lebanon')))
    profile_pic=models.JSONField()
    account_status=models.CharField(max_length=50,blank=True,null=True,default='Active',choices=(('Active','Active'),('Inactive','Inactive'),('Blocked','Blocked')))
    role=models.CharField(max_length=50,blank=True,null=True,default='Admin',choices=(('Admin','Admin'),('Supplier','Supplier'),('Customer','Customer'),('Staff','Staff')))
    dob=models.DateField(blank=True,null=True)
    username=models.CharField(max_length=50,unique=True)
    password=models.CharField(max_length=255)
    social_media_links=models.JSONField(blank=True,null=True)
    addition_details=models.JSONField(blank=True,null=True)
    language=models.CharField(max_length=50,blank=True,null=True,default='English',choices=(('English','English'),('Hindi','Hindi'),('Spanish','Spanish'),('French','French'),('German','German'),('Italian','Italian'),('Portuguese','Portuguese'),('Russian','Russian'),('Chinese','Chinese'),('Japanese','Japanese'),('Korean','Korean'),('Arabic','Arabic'),('Turkish','Turkish'),('Dutch','Dutch'),('Polish','Polish'),('Swedish','Swedish'),('Danish','Danish'),('Norwegian','Norwegian'),('Finnish','Finnish'),('Greek','Greek'),('Czech','Czech'),('Hungarian','Hungarian'),('Romanian','Romanian'),('Bulgarian','Bulgarian'),('Croatian','Croatian'),('Slovak','Slovak'),('Slovenian','Slovenian'),('Lithuanian','Lithuanian'),('Latvian','Latvian'),('Estonian','Estonian'),('Ukrainian','Ukrainian'),('Belarusian','Belarusian'),('Serbian','Serbian'),('Macedonian','Macedonian'),('Bosnian','Bosnian'),('Albanian','Albanian'),('Montenegrin','Montenegrin'),('Catalan','Catalan'),('Basque','Basque'),('Galician','Galician'),('Welsh','Welsh'),('Irish','Irish'),('Scots Gaelic','Scots Gaelic'),('Manx','Manx'),('Cornish','Cornish'),('Breton','Breton')))
    departMent=models.CharField(max_length=50,blank=True,null=True,choices=(('IT','IT'),('HR','HR'),('Finance','Finance'),('Sales','Sales'),('Marketing','Marketing'),('Production','Production'),('Quality Control','Quality Control'),('Purchase','Purchase'),('Logistics','Logistics'),('Customer Service','Customer Service'),('R&D','R&D'),('Legal','Legal'),('Admin','Admin'),('Security','Security'),('Housekeeping','Housekeeping'),('Maintenance','Maintenance'),('Engineering','Engineering'),('Design','Design'),('Testing','Testing'),('Training','Training'),('Consulting','Consulting'),('Support','Support'),('Operations','Operations'),('Management','Management'),('Others','Others')))
    designation=models.CharField(max_length=50,blank=True,null=True,choices=(('CEO','CEO'),('CFO','CFO'),('CTO','CTO'),('CMO','CMO'),('COO','COO'),('CIO','CIO'),('CISO','CISO'),('CDO','CDO'),('CRO','CRO'),('CSO','CSO'),('CPO','CPO'),('CLO','CLO'),('CBO','CBO'),('CVO','CVO'),('CNO','CNO'),('CQO','CQO'),('CPDO','CPDO'),('CCO','CCO'),('CDO','CDO'),('CLO','CLO'),('CBO','CBO'),('CVO','CVO'),('CNO','CNO'),('CQO','CQO'),('CPDO','CPDO'),('CCO','CCO'),('CDO','CDO'),('CLO','CLO'),('CBO','CBO'),('CVO','CVO'),('CNO','CNO'),('CQO','CQO'),('CPDO','CPDO'),('CCO','CCO'),('CDO','CDO'),('CLO','CLO'),('CBO','CBO'),('CVO','CVO'),('CNO','CNO'),('CQO','CQO'),('CPDO','CPDO'),('CCO','CCO'),('CDO','CDO'),('CLO','CLO'),('CBO','CBO'),('CVO','CVO'),('CNO','CNO'),('CQO','CQO'),('CPDO','CPDO'),('CCO','CCO'),('CDO','CDO'),('CLO','CLO'),('CBO','CBO'),('CVO','CVO'),('CNO','CNO'),('CQO','CQO'),('CPDO','CPDO'),('CCO','CCO'),('CDO','CDO'),('CLO','CLO'),('CBO','CBO'),('CVO','CVO'),('CNO','CNO'),('CQO','CQO'),('CPDO','CPDO'),('CCO','CCO'),('CDO','CDO'),('CLO','CLO'),('CBO','CBO'),('CVO','CVO'),('CNO','CNO'),('CQO','CQO'),('CPDO','CPDO'),('CCO','CCO'),('CDO','CDO'),('CLO','CLO'),('CBO','CBO'),('CVO','CVO'),('CNO','CNO'),('Other','Other')))
    time_zone=models.CharField(max_length=50,blank=True,null=True,default='UTC+05:30',choices=(('UTC-12:00','UTC-12:00'),('UTC-11:00','UTC-11:00'),('UTC-10:00','UTC-10:00'),('UTC-09:30','UTC-09:30'),('UTC-09:00','UTC-09:00'),('UTC-08:00','UTC-08:00'),('UTC-07:00','UTC-07:00'),('UTC-06:00','UTC-06:00'),('UTC-05:00','UTC-05:00'),('UTC-04:00','UTC-04:00'),('UTC-03:30','UTC-03:30'),('UTC-03:00','UTC-03:00'),('UTC-02:00','UTC-02:00'),('UTC-01:00','UTC-01:00'),('UTC','UTC'),('UTC+01:00','UTC+01:00'),('UTC+02:00','UTC+02:00'),('UTC+03:00','UTC+03:00'),('UTC+03:30','UTC+03:30'),('UTC+04:00','UTC+04:00'),('UTC+04:30','UTC+04:30'),('UTC+05:00','UTC+05:00'),('UTC+05:30','UTC+05:30'),('UTC+05:45','UTC+05:45'),('UTC+06:00','UTC+06:00'),('UTC+06:30','UTC+06:30'),('UTC+07:00','UTC+07:00'),('UTC+08:00','UTC+08:00'),('UTC+08:45','UTC+08:45'),('UTC+09:00','UTC+09:00'),('UTC+09:30','UTC+09:30'),('UTC+10:00','UTC+10:00'),('UTC+10:30','UTC+10:30'),('UTC+11:00','UTC+11:00'),('UTC+12:00','UTC+12:00'),('UTC+12:45','UTC+12:45'),('UTC+13:00','UTC+13:00'),('UTC+14:00','UTC+14:00')))
    last_login=models.DateTimeField(blank=True,null=True)
    last_device=models.CharField(max_length=50,blank=True,null=True)
    last_ip=models.GenericIPAddressField(blank=True,null=True)
    currency=models.CharField(max_length=50,blank=True,null=True,default='INR',choices=(('USD','USD'),('INR','INR'),('EUR','EUR'),('GBP','GBP'),('AUD','AUD'),('CAD','CAD'),('JPY','JPY'),('CNY','CNY'),('RUB','RUB'),('BRL','BRL'),('ZAR','ZAR'),('NGN','NGN'),('MXN','MXN'),('ARS','ARS'),('CHF','CHF'),('SEK','SEK'),('NOK','NOK'),('DKK','DKK'),('PLN','PLN'),('CZK','CZK'),('TRY','TRY'),('UAH','UAH'),('HUF','HUF'),('RON','RON'),('BGN','BGN'),('HRK','HRK'),('SLO','SLO'),('SK','SK'),('LT','LT'),('LV','LV'),('EE','EE'),('IE','IE'),('SC','SC'),('WL','WL'),('NI','NI'),('NZ','NZ'),('SGD','SGD'),('MYR','MYR'),('THB','THB'),('IDR','IDR'),('PHP','PHP'),('VND','VND'),('KRW','KRW'),('KPW','KPW'),('TWD','TWD'),('HKD','HKD'),('MOP','MOP'),('BDT','BDT'),('PKR','PKR'),('LKR','LKR'),('NPR','NPR'),('BTN','BTN'),('MVR','MVR'),('AFN','AFN'),('IRR','IRR'),('IQD','IQD'),('SYP','SYP'),('LBN','LBN')))
    domain_user_id=models.ForeignKey('self',on_delete=models.CASCADE,blank=True,null=True,related_name='domain_user_id_user')
    domain_name=models.CharField(max_length=50,blank=True,null=True)
    plan_type=models.CharField(max_length=50,blank=True,default='Free',null=True,choices=(('Free','Free'),('Basic','Basic'),('Standard','Standard'),('Premium','Premium'),('Enterprise','Enterprise')))
    added_by_user_id=models.ForeignKey('self',on_delete=models.CASCADE,blank=True,null=True,related_name='added_by_user_id_user')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def defaultkey():
        return 'username'
    
    def save(self, *args, **kwargs):
        if not self.domain_user_id and self.id:
            self.domain_user_id=Users.objects.get(id=self.id)

        if not self.pk or Users.objects.filter(pk=self.pk).values('password').first()['password']!=self.password:
            self.password=make_password(self.password)
        super().save(*args, **kwargs)
    

class UserShippingAddress(models.Model):
    id=models.AutoField(primary_key=True)
    user=models.ForeignKey(Users,on_delete=models.CASCADE,related_name='user_shipping_address')
    address_type=models.CharField(max_length=50,choices=(('Home','Home'),('Office','Office'),('Other','Other')))
    address=models.TextField()
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    pincode=models.CharField(max_length=10)
    country=models.CharField(max_length=50,choices=(('India','India'),('USA','USA'),('UK','UK'),('Australia','Australia'),('Canada','Canada'),('Germany','Germany'),('France','France'),('Italy','Italy'),('Japan','Japan'),('China','China'),('Russia','Russia'),('Brazil','Brazil'),('South Africa','South Africa'),('Nigeria','Nigeria'),('Mexico','Mexico'),('Argentina','Argentina'),('Spain','Spain'),('Portugal','Portugal'),('Greece','Greece'),('Sweden','Sweden'),('Norway','Norway'),('Finland','Finland'),('Denmark','Denmark'),('Netherlands','Netherlands'),('Belgium','Belgium'),('Switzerland','Switzerland'),('Austria','Austria'),('Poland','Poland'),('Czech Republic','Czech Republic'),('Turkey','Turkey'),('Ukraine','Ukraine'),('Hungary','Hungary'),('Romania','Romania'),('Bulgaria','Bulgaria'),('Croatia','Croatia'),('Slovenia','Slovenia'),('Slovakia','Slovakia'),('Lithuania','Lithuania'),('Latvia','Latvia'),('Estonia','Estonia'),('Ireland','Ireland'),('Scotland','Scotland'),('Wales','Wales'),('Northern Ireland','Northern Ireland'),('New Zealand','New Zealand'),('Singapore','Singapore'),('Malaysia','Malaysia'),('Thailand','Thailand'),('Indonesia','Indonesia'),('Philippines','Philippines'),('Vietnam','Vietnam'),('South Korea','South Korea'),('North Korea','North Korea'),('Taiwan','Taiwan'),('Hong Kong','Hong Kong'),('Macau','Macau'),('Bangladesh','Bangladesh'),('Pakistan','Pakistan'),('Sri Lanka','Sri Lanka'),('Nepal','Nepal'),('Bhutan','Bhutan'),('Maldives','Maldives'),('Afghanistan','Afghanistan'),('Iran','Iran'),('Iraq','Iraq'),('Syria','Syria'),('Lebanon','Lebanon')))
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

class Modules(models.Model):
    id=models.AutoField(primary_key=True)
    module_name=models.CharField(max_length=50,unique=True)
    module_icon=models.CharField(null=True,blank=True,max_length=50)
    is_menu=models.BooleanField(default=True)
    is_active=models.BooleanField(default=True)
    module_url=models.CharField(null=True,blank=True,max_length=50)
    parent_id=models.ForeignKey('self',on_delete=models.CASCADE,blank=True,null=True)
    display_order=models.IntegerField(default=0)
    module_description=models.CharField(null=True,blank=True,max_length=255)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


class UserPermissions(models.Model):
    id=models.AutoField(primary_key=True)
    user=models.ForeignKey(Users,on_delete=models.CASCADE,related_name='user_permissions_1')
    module=models.ForeignKey(Modules,on_delete=models.CASCADE)
    is_permission=models.BooleanField(default=False)
    domain_user_id=models.ForeignKey(Users,on_delete=models.CASCADE,blank=True,null=True,related_name='domain_user_id_user_permissions')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

class ModuleUrls(models.Model):
    id=models.AutoField(primary_key=True)
    module=models.ForeignKey(Modules,on_delete=models.CASCADE,blank=True,null=True)
    url=models.CharField(max_length=255)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

class ActivityLog(models.Model):
    id=models.AutoField(primary_key=True)
    user=models.ForeignKey(Users,on_delete=models.CASCADE,related_name='user_activity_log')
    activity=models.TextField()
    activity_type=models.CharField(max_length=50,blank=True)
    activity_date=models.DateTimeField(auto_now_add=True)
    activity_ip=models.GenericIPAddressField()
    activity_device=models.CharField(max_length=50)
    domain_user_id=models.ForeignKey(Users,on_delete=models.CASCADE,blank=True,null=True,related_name='domain_user_id_activity_log')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)