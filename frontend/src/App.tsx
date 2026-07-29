import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const SearchPage = lazy(() =>
  import("@/pages/SearchPage").then((module) => ({ default: module.SearchPage })),
);
const BookDetailPage = lazy(() =>
  import("@/pages/BookDetailPage").then((module) => ({ default: module.BookDetailPage })),
);
const LibraryPage = lazy(() =>
  import("@/pages/LibraryPage").then((module) => ({ default: module.LibraryPage })),
);
const RecommendationPage = lazy(() =>
  import("@/pages/RecommendationPage").then((module) => ({
    default: module.RecommendationPage,
  })),
);
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((module) => ({ default: module.LoginPage })),
);
const SignupPage = lazy(() =>
  import("@/pages/SignupPage").then((module) => ({ default: module.SignupPage })),
);
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((module) => ({ default: module.ProfilePage })),
);
const AdminPage = lazy(() =>
  import("@/pages/AdminPage").then((module) => ({ default: module.AdminPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })),
);

function PageLoading() {
  return (
    <div className="page-shell flex min-h-[55vh] items-center justify-center">
      <div className="flex items-center gap-3 text-sm font-bold text-[var(--brand)]">
        <span className="size-5 animate-spin rounded-full border-2 border-[var(--brand)]/20 border-t-[var(--brand)]" />
        책장을 펼치고 있어요
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/recommend" component={RecommendationPage} />
            <Route path="/books/:isbn13" component={BookDetailPage} />
            <Route path="/library" component={LibraryPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/admin" component={AdminPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
