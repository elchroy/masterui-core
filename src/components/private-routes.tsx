// import { productEntityConfig, type Product } from "@kit/configs/product-entity";
// import { getMenuItemsGroup } from "@kit/setup/sidebar";
// import { Route, Routes } from "react-router-dom";
// import { DummyCrudApi, type CrudApiClientInterface } from "../apis/crud-api";
// import type { AuthUser } from "../apis/domain";
// import { profileEndpoints } from "../apps/setup";
// import { blogCategoryEntityConfig, type BlogCategory } from "../configs/blog-category-entity";
// import { blogPostEntityConfig, type BlogPost } from "../configs/blog-post-entity";
// import { userEntityConfig } from "../configs/user-entity";
// import { createCrudHooks } from "../hooks/use-crud";
// import {
//   BillingOverviewPage,
//   BillingSettingsPage,
//   InvoicesPage,
//   PaymentMethodsPage,
//   SubscriptionPlansPage,
//   UsageAnalyticsPage,
// } from "../pages/billing";
// import { DashboardPage } from "../pages/dashboard";
// import { EntityRouter } from "../pages/entities/entity-router";
// import {
//   AccountSettingsPage,
//   EmailChangePage,
//   PasswordChangePage,
//   ProfileEditPage,
//   ProfileOverviewPage,
// } from "../pages/profile";
// import { blogDatabaseModel, database } from "../setup/database";
// import BaseLayout from "./base-layout";

// // Create user API client and hooks
// const userApiClient: CrudApiClientInterface<AuthUser> =
//   new DummyCrudApi<AuthUser>(database.users, {}, {});

// const userHook = createCrudHooks<AuthUser>("users", userApiClient);

// // Create blog post API client and hooks
// const blogPostApiClient: CrudApiClientInterface<BlogPost> =
//   new DummyCrudApi<BlogPost>(blogDatabaseModel.blogPosts, {}, {});

// const blogPostHook = createCrudHooks<BlogPost>("blog-posts", blogPostApiClient);

// // Create blog category API client and hooks
// const blogCategoryApiClient: CrudApiClientInterface<BlogCategory> =
//   new DummyCrudApi<BlogCategory>(blogDatabaseModel.blogCategories, {}, {});

// const blogCategoryHook = createCrudHooks<BlogCategory>("blog-categories", blogCategoryApiClient);

// // Create product API client and hooks
// const productApiClient: CrudApiClientInterface<Product> =
//   new DummyCrudApi<Product>(database.products, {}, {});

// const productHook = createCrudHooks<Product>("products", productApiClient);

// export function PrivateRoutes({
//   loginPage,
// }: {
//   loginPage: string;
// }) {
//   // Get the menu items dynamically to include registered entities
//   const menuItemsGroup = getMenuItemsGroup();

//   return (
//     <Routes>
//       {/* 📱 Main application layout with sidebar and header */}
//       <Route path="/" element={<BaseLayout loginPage={loginPage} menuItemsGroup={menuItemsGroup} />}>
//         <Route index element={<DashboardPage />} />
//         <Route path="dashboard" element={<DashboardPage />} />
        
//         {/* 🧩 Entity Routes - Using EntityRouter for all CRUD operations */}
        
//         {/* User Entity Routes */}
//         {/* <EntityRouter config={userEntityConfig} entityHooks={userHook} /> */}
//         {EntityRouter({
//           config: userEntityConfig,
//           entityHooks: userHook
//         })}
        
//         {/* Blog Post Entity Routes */}
//         {/* <EntityRouter config={blogPostEntityConfig} entityHooks={blogPostHook} /> */}
//         {EntityRouter({
//           config: blogPostEntityConfig,
//           entityHooks: blogPostHook
//         })}

//         {/* Blog Category Entity Routes */}
//         {/* <EntityRouter config={blogCategoryEntityConfig} entityHooks={blogCategoryHook} /> */}
//         {EntityRouter({
//           config: blogCategoryEntityConfig,
//           entityHooks: blogCategoryHook
//         })}

//         {/* Product Entity Routes */}
//         {/* <EntityRouter config={productEntityConfig} entityHooks={productHook} /> */}
//         {EntityRouter({
//           config: productEntityConfig,
//           entityHooks: productHook
//         })}

//         {/* 👤 Profile Management Routes */}
//         <Route path={profileEndpoints.profileOverviewPage.replace('/app/', '')} element={<ProfileOverviewPage />} />
//         <Route path={profileEndpoints.profileEditPage.replace('/app/', '')} element={<ProfileEditPage />} />
//         <Route path={profileEndpoints.emailChangePage.replace('/app/', '')} element={<EmailChangePage />} />
//         <Route path={profileEndpoints.passwordChangePage.replace('/app/', '')} element={<PasswordChangePage />} />
//         <Route path={profileEndpoints.accountSettingsPage.replace('/app/', '')} element={<AccountSettingsPage />} />
        
//         {/* 💳 Billing Management Routes */}
//         <Route path="billing" element={<BillingOverviewPage />} />
//         <Route path="billing/overview" element={<BillingOverviewPage />} />
//         <Route path="billing/plans" element={<SubscriptionPlansPage />} />
//         <Route path="billing/payment-methods" element={<PaymentMethodsPage />} />
//         <Route path="billing/invoices" element={<InvoicesPage />} />
//         <Route path="billing/usage" element={<UsageAnalyticsPage />} />
//         <Route path="billing/settings" element={<BillingSettingsPage />} />
//       </Route>
//     </Routes>
//   );
// }
