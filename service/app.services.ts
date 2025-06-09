import { ServicesConfig } from "@/types/ServicesConfig";
import { authService } from "@/service/auth.service";
import { commentService } from "@/service/comment.service";
import { emailService } from "@/service/email.service";
import { movieService } from "@/service/movies.service";
import { tvSeriesService } from "@/service/tvseries.service";
import { userService } from "@/service/user.service";
import { verificationTokenService } from "@/service/verificationToken.service";

const appServices = (configuration: ServicesConfig) => ({
  auth: authService(),
  comments: commentService(),
  emails: emailService(),
  movies: movieService(configuration),
  tvseries: tvSeriesService(configuration),
  users: userService(),
  verificationTokens: verificationTokenService(),
});

type AppServices = ReturnType<typeof appServices>;

const s: AppServices = appServices({ language: "es-ES" });

export default s;
