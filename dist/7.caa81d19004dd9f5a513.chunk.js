webpackJsonp([7],{1019:function(a,o,s){"use strict";var r=s(0),t=s(14),e=s(13),i=s(293),n=s(1344),l=s(1421),d=function(){function a(){}return a=__decorate([r.NgModule({imports:[t.CommonModule,e.ReactiveFormsModule,e.FormsModule,i.NgaModule,l.routing],declarations:[n.Register]}),__metadata("design:paramtypes",[])],a)}();Object.defineProperty(o,"__esModule",{value:!0}),o.default=d},1344:function(a,o,s){"use strict";var r=s(0),t=s(13),e=s(603),i=function(){function a(a){this.submitted=!1,this.form=a.group({name:["",t.Validators.compose([t.Validators.required,t.Validators.minLength(4)])],email:["",t.Validators.compose([t.Validators.required,e.EmailValidator.validate])],passwords:a.group({password:["",t.Validators.compose([t.Validators.required,t.Validators.minLength(4)])],repeatPassword:["",t.Validators.compose([t.Validators.required,t.Validators.minLength(4)])]},{validator:e.EqualPasswordsValidator.validate("password","repeatPassword")})}),this.name=this.form.controls.name,this.email=this.form.controls.email,this.passwords=this.form.controls.passwords,this.password=this.passwords.controls.password,this.repeatPassword=this.passwords.controls.repeatPassword}return a.prototype.onSubmit=function(a){this.submitted=!0,this.form.valid},a=__decorate([r.Component({selector:"register",encapsulation:r.ViewEncapsulation.None,styles:[s(1592)],template:s(1629)}),__metadata("design:paramtypes",["function"==typeof(o="undefined"!=typeof t.FormBuilder&&t.FormBuilder)&&o||Object])],a);var o}();o.Register=i},1421:function(a,o,s){"use strict";var r=s(56),t=s(1344),e=[{path:"",component:t.Register}];o.routing=r.RouterModule.forChild(e)},1592:function(a,o){a.exports='.auth-main{display:flex;align-items:center;height:100%;width:100%;position:absolute}.auth-block{width:540px;margin:0 auto;border-radius:5px;background:rgba(0,0,0,0.55);color:#fff;padding:32px}.auth-block h1{font-weight:300;margin-bottom:28px;text-align:center}.auth-block p{font-size:16px}.auth-block a{text-decoration:none;outline:none;transition:all 0.2s ease;color:#00abff}.auth-block a:hover{color:#0091d9}.auth-block .control-label{padding-top:11px;color:#fff}.auth-block .form-group{margin-bottom:12px}.auth-input{width:300px;margin-bottom:24px}.auth-input input{display:block;width:100%;border:none;font-size:16px;padding:4px 10px;outline:none}a.forgot-pass{display:block;text-align:right;margin-bottom:-20px;float:right;z-index:2;position:relative}.auth-link{display:block;font-size:16px;text-align:center;margin-bottom:33px}.auth-sep{margin-top:36px;margin-bottom:24px;line-height:20px;font-size:16px;text-align:center;display:block;position:relative}.auth-sep>span{display:table-cell;width:30%;white-space:nowrap;padding:0 24px;color:#fff}.auth-sep>span>span{margin-top:-12px;display:block}.auth-sep:before,.auth-sep:after{border-top:solid 1px #fff;content:"";height:1px;width:35%;display:table-cell}.al-share-auth{text-align:center}.al-share-auth .al-share{float:none;margin:0;padding:0;display:inline-block}.al-share-auth .al-share li{margin-left:24px}.al-share-auth .al-share li:first-child{margin-left:0}.al-share-auth .al-share li i{font-size:24px}.btn-auth{color:#fff !important}\n'},1629:function(a,o){a.exports='<div class="auth-main">\r\n  <div class="auth-block">\r\n    <h1>Sign up to ng2-admin</h1>\r\n    <a routerLink="/login" class="auth-link">Already have an ng2-admin account? Sign in!</a>\r\n\r\n    <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)" class="form-horizontal">\r\n      <div class="form-group row" [ngClass]="{\'has-error\': (!name.valid && name.touched), \'has-success\': (name.valid && name.touched)}">\r\n        <label for="inputName3" class="col-sm-2 control-label">Name</label>\r\n\r\n        <div class="col-sm-10">\r\n          <input [formControl]="name" type="text" class="form-control" id="inputName3" placeholder="Full Name">\r\n        </div>\r\n      </div>\r\n      <div class="form-group row" [ngClass]="{\'has-error\': (!email.valid && email.touched), \'has-success\': (email.valid && email.touched)}">\r\n        <label for="inputEmail3" class="col-sm-2 control-label">Email</label>\r\n\r\n        <div class="col-sm-10">\r\n          <input [formControl]="email" type="email" class="form-control" id="inputEmail3" placeholder="Email">\r\n        </div>\r\n      </div>\r\n      <div class="form-group row" [ngClass]="{\'has-error\': (!password.valid && password.touched), \'has-success\': (password.valid && password.touched)}">\r\n        <label for="inputPassword3" class="col-sm-2 control-label">Password</label>\r\n\r\n        <div class="col-sm-10">\r\n          <input [formControl]="password" type="password" class="form-control" id="inputPassword3" placeholder="Password">\r\n        </div>\r\n      </div>\r\n      <div class="form-group row" [ngClass]="{\'has-error\': (!repeatPassword.valid && repeatPassword.touched), \'has-success\': (repeatPassword.valid && repeatPassword.touched)}">\r\n        <label for="inputPassword4" class="col-sm-2 control-label">Repeat</label>\r\n\r\n        <div class="col-sm-10">\r\n          <input [formControl]="repeatPassword" type="password" class="form-control" id="inputPassword4" placeholder="Repeat">\r\n          <span *ngIf="!passwords.valid && (password.touched || repeatPassword.touched)" class="help-block sub-little-text">Passwords don\'t match.</span>\r\n        </div>\r\n      </div>\r\n      <div class="form-group row">\r\n        <div class="offset-sm-2 col-sm-10">\r\n          <button [disabled]="!form.valid" type="submit" class="btn btn-default btn-auth">Sign up</button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n\r\n    <div class="auth-sep"><span><span>or Sign up with one click</span></span></div>\r\n\r\n    <div class="al-share-auth">\r\n      <ul class="al-share clearfix">\r\n        <li><i class="socicon socicon-facebook" title="Share on Facebook"></i></li>\r\n        <li><i class="socicon socicon-twitter" title="Share on Twitter"></i></li>\r\n        <li><i class="socicon socicon-google" title="Share on Google Plus"></i></li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n'}});