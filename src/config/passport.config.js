import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { megayauserModel } from "../models/megayauser.model.js";
import { hashPassword, comparePassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID:'Iv1.2993814456c75940',
        clientSecret:'f0ec5228d373161ce04095e9de6a8ba90fa37954',
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        scope: ['user:email']
      },
  async (accessToken, refreshToken, profile, done) => {
    try{
      console.log(profile)

      const user = await megayauserModel.findOne({ 
        email: profile.emails[0].value 
      })

      if(!user) {
        const [first_name, last_name] = profile._json.name.split(" ")
        const newUser = {
          identification,
          first_name,
          last_name,
          email: profile.emails[0].value,
          password: "",
          role

        }

      //await newUser.save()
      const savedUser = await megayauserModel.create(newUser)

        done(null, newUser)
      } else {
        done(null, user)
      }
      } catch (error) {
        done(error)
      }
    }
  )
)

  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "identification",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const { identification, first_name, last_name, email, role } = req.body;

        if ( !identification ||!first_name || !last_name || !email || !password) {
          return done('All fields are required', false);
        }

        try {
          const user = await megayauserModel.findOne({ identification: username });

          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = await megayauserModel.create({
            identification,
            first_name,
            last_name,
            email,
            password: hashPassword(password),
            role,
          });
          
          return done(null, newUser);
        } catch (error) {
          return done(`Error: ${error}`, false);
        }
      }
    )
  );

  // passport.use("restore")

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "identification",
      },
      async (username, password, done) => {
        try {
          const user = await megayauserModel.findOne({ identification: username });

          if (!user) {
            console.log("User not found");
            return done(null, false);
          }

          if (!comparePassword(user, password)) {
            console.log("Invalid password");
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(`Error: ${error}`, false);
        }
      }
    )
  );

  // passport.use("logout")

  passport.serializeUser((user, done) => {
    done(null, user._id);
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await megayauserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
};

export default initializePassport;