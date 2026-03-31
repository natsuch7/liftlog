const IS_PROD = import.meta.env.PROD;

function sendEvent(name, params = {}) {
  if (IS_PROD) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
  } else {
    console.log("[Analytics]", name, params);
  }
}

export function useAnalytics() {
  function trackGenerateProgram({ bodyWeight, bench1rm, squat1rm, deadlift1rm }) {
    sendEvent("generate_program", {
      body_weight: bodyWeight,
      bench_1rm: bench1rm,
      squat_1rm: squat1rm,
      deadlift_1rm: deadlift1rm,
    });
  }

  function trackStartSession({ weekNumber, phase }) {
    sendEvent("start_session", {
      week_number: weekNumber,
      phase,
    });
  }

  function trackCompleteSession({ weekNumber, completed }) {
    sendEvent("complete_session", {
      week_number: weekNumber,
      completed,
    });
  }

  function trackExitPoint({ page }) {
    sendEvent("exit_point", { page });
  }

  return { trackGenerateProgram, trackStartSession, trackCompleteSession, trackExitPoint };
}
