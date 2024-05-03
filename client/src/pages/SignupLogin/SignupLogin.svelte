<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { fetchPost } from "../../util/api.js";
  import { BASE_URL } from "../../stores/generalStore.js"
  import { navigate, useLocation } from "svelte-navigator";
  import { user } from "../../stores/generalStore.js"
  import toast, {Toaster} from 'svelte-french-toast'

  // Found svelte-forms-lib and yup as an option for easier handling forms and errors by googling for form npms.
  // It was relatively easy to use.
  let showSignUp = true;
  const location = useLocation();

  const {
    form: form1,
    errors: errors1,
    handleChange: handleChange1,
    handleSubmit: handleSubmit1,
  } = createForm({
    initialValues: {
      email: "",
      password: "",
      passwordconfirm: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
      passwordconfirm: yup
        .string()
        .required("Confirm password is required")
        .test("Passwords must match", "Passwords must match", function (value) {
          return this.parent.password === value;
        }),
    }),
    onSubmit: async (values) => {
      const body = {
        email: values.email,
        password: values.password,
      };
      const result = await fetchPost($BASE_URL + "/signup", body);
      if(result === "Email already exists"){
        toast.error("Email already exists.", {
        position: "bottom-center"
      })
      } else { 
        toast.success("Signup successful, ready to login.", {
          position: "bottom-center"
        })
      }
      showSignUp = false;
    },
  });

  const {
    form: form2,
    errors: errors2,
    handleChange: handleChange2,
    handleSubmit: handleSubmit2,
  } = createForm({
    initialValues: {
      emaillogin: "",
      passwordlogin: "",
    },
    validationSchema: yup.object().shape({
      emaillogin: yup.string().email().required("Email is required"),
      passwordlogin: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const body = {
        email: values.emaillogin,
        password: values.passwordlogin,
      };
      const result = await fetchPost($BASE_URL + "/login", body);
      if(result == "correct"){
        user.set( values.emaillogin, values.passwordlogin )
        const from = ($location.state && $location.state.from) || "/";
        navigate(from, {replace: true})
      } else {
        toast.error("Error processing login.", {
          position: "bottom-center"
        })
      } 
    },
  });
</script>

<div class="authcard relative h-[90vh] md:px-10">
  <div
    class="signup-card absolute w-full h-full transform transition-transform duration-500"
    style="transform: rotateY({showSignUp ? '0deg' : '180deg'})"
  >
    <div
      class="flex flex-col items-center px-6 py-8 md:h-full lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border mx-auto md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create and account
          </h1>
          <form class="space-y-4 md:space-y-6" on:submit={handleSubmit1}>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                on:change={handleChange1}
                on:blur={handleChange1}
                bind:value={$form1.email}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
              />
              {#if $errors1.email}
                <small>{$errors1.email}</small>
              {/if}
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                on:change={handleChange1}
                on:blur={handleChange1}
                bind:value={$form1.password}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {#if $errors1.password}
                <small>{$errors1.password}</small>
              {/if}
            </div>
            <div>
              <label
                for="passwordconfirm"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirm password</label
              >
              <input
                type="password"
                name="passwordconfirm"
                on:change={handleChange1}
                on:blur={handleChange1}
                bind:value={$form1.passwordconfirm}
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {#if $errors1.passwordconfirm}
                <small>{$errors1.passwordconfirm}</small>
              {/if}
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  name="rules"
                  aria-describedby="rules"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div class="ml-3 text-sm">
                <label
                  for="rules"
                  class="font-light text-gray-500 dark:text-gray-300"
                  >I accept the <a
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="/rules">Rules</a
                  ></label
                >
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >Create an account</button
            >
          </form>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? 
            <button
              id="button-form"
              on:click={() => (showSignUp = !showSignUp)}
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Login here</button
            >
          </p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="login-card absolute w-full h-full transform transition-transform duration-500"
    style="transform: rotateY({showSignUp ? '-180deg' : '0deg'})"
  >
    <div
      class="flex flex-col items-center px-6 py-8 mx-auto md:h-full lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Login to existing account
          </h1>
          <form class="space-y-4 md:space-y-6" on:submit={handleSubmit2}>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="email"
                name="emaillogin"
                on:change={handleChange2}
                on:blur={handleChange2}
                bind:value={$form2.emaillogin}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
              />
              {#if $errors2.emaillogin}
                <small>{$errors2.emaillogin}</small>
              {/if}
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="passwordlogin"
                placeholder="••••••••"
                on:change={handleChange2}
                on:blur={handleChange2}
                bind:value={$form2.passwordlogin}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {#if $errors2.passwordlogin}
                <small>{$errors2.passwordlogin}</small>
              {/if}
            </div>
            <div class="flex items-start">
              <div class="ml-3 text-sm"></div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >Login</button
            >
          </form>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Need to create an acount? <button
              on:click={() => (showSignUp = !showSignUp)}
              id="signup-form"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Signup here</button
            >
          </p>
        </div>
      </div>
    </div>
    <Toaster />
  </div>
</div>


<style>
  small {
    color: red;
  }
  .signup-card, .login-card {
    backface-visibility: hidden;
  }
</style>
