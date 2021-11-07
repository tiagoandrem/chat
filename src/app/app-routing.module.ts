import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'blockedlist',
    loadChildren: () => import('./blockedlist/blockedlist.module').then(m => m.BlockedlistPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./friends/friends.module').then(m => m.FriendsPageModule)
  },
  {
    path: 'group/:id',
    loadChildren: () => import('./group/group.module').then(m => m.GroupPageModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups/groups.module').then(m => m.GroupsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./message/message.module').then(m => m.MessagePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'addmembers/:id',
    loadChildren: () => import('./addmembers/addmembers.module').then(m => m.AddmembersPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotPageModule)
  },
  {
    path: 'groupinfo/:id',
    loadChildren: () => import('./groupinfo/groupinfo.module').then(m => m.GroupinfoPageModule)
  },
  {
    path: 'imagemodal',
    loadChildren: () => import('./imagemodal/imagemodal.module').then(m => m.ImagemodalPageModule)
  },
  {
    path: 'newgroup',
    loadChildren: () => import('./newgroup/newgroup.module').then(m => m.NewgroupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'userinfo/:id',
    loadChildren: () => import('./userinfo/userinfo.module').then(m => m.UserinfoPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
