(function () {
  "use strict";

  const SUCCESS_MESSAGES = ["Muito bem!", "Isso aí!", "Boa!"];
  const ERROR_MESSAGE = "Ops! Tenta outra vez";
  const MAX_DISPLAY_DIGITS = 12;

  const calcEl = document.getElementById("calculator");
  const displayEl = document.getElementById("display");
  const expressionEl = document.getElementById("expression");
  const bannerEl = document.getElementById("banner");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReducedMotion.matches) {
    calcEl.dataset.reducedMotion = "true";
  }
  prefersReducedMotion.addEventListener("change", (e) => {
    calcEl.dataset.reducedMotion = e.matches ? "true" : "false";
  });

  let operandA = null;
  let operandB = null;
  let pendingOperator = null;
  let displayString = "0";
  let expressionString = "";
  let afterEquals = false;
  let successIndex = 0;
  let successTimer = null;
  let feedbackMode = "none";

  function formatNumber(n) {
    if (!Number.isFinite(n)) return "—";
    const rounded = Math.round(n * 1e10) / 1e10;
    let s = String(rounded);
    if (s.length > MAX_DISPLAY_DIGITS) {
      s = rounded.toPrecision(MAX_DISPLAY_DIGITS);
    }
    return s;
  }

  function setDisplay(value) {
    displayString = value;
    displayEl.textContent = value;
  }

  function setExpression(value) {
    expressionString = value;
    expressionEl.textContent = value;
  }

  function clearFeedbackTimer() {
    if (successTimer) {
      clearTimeout(successTimer);
      successTimer = null;
    }
  }

  function setFeedback(mode, message) {
    clearFeedbackTimer();
    feedbackMode = mode;
    calcEl.dataset.feedback = mode;

    if (mode === "none" || !message) {
      bannerEl.hidden = true;
      bannerEl.textContent = "";
      calcEl.dataset.feedback = "none";
      return;
    }

    bannerEl.hidden = false;
    bannerEl.textContent = message;

    if (mode === "success") {
      successTimer = setTimeout(() => setFeedback("none"), 2500);
    }
  }

  function applyOperator(a, op, b) {
    switch (op) {
      case "+":
        return a + b;
      case "−":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        if (b === 0) return null;
        return a / b;
      default:
        return null;
    }
  }

  function operatorSymbol(op) {
    return op || "";
  }

  function flashDisplayClear() {
    const wrap = displayEl.closest(".calc__display-wrap");
    wrap.classList.remove("is-clearing");
    void wrap.offsetWidth;
    wrap.classList.add("is-clearing");
  }

  function resetAll() {
    operandA = null;
    operandB = null;
    pendingOperator = null;
    afterEquals = false;
    setDisplay("0");
    setExpression("");
    setFeedback("none");
  }

  function inputDigit(digit) {
    if (feedbackMode === "success") setFeedback("none");
    if (feedbackMode === "error") setFeedback("none");

    if (afterEquals) {
      operandA = null;
      pendingOperator = null;
      afterEquals = false;
      setExpression("");
    }

    if (displayString === "0" || displayString === "—") {
      setDisplay(digit);
    } else if (displayString.replace(".", "").length < MAX_DISPLAY_DIGITS) {
      setDisplay(displayString + digit);
    }
  }

  function inputOperator(op) {
    if (feedbackMode === "success") setFeedback("none");
    if (feedbackMode === "error") setFeedback("none");

    const current = parseFloat(displayString);
    if (displayString === "—" || Number.isNaN(current)) {
      return;
    }

    if (operandA !== null && pendingOperator && !afterEquals) {
      const result = applyOperator(operandA, pendingOperator, current);
      if (result === null) {
        showError();
        return;
      }
      operandA = result;
      setDisplay(formatNumber(result));
    } else {
      operandA = current;
    }

    pendingOperator = op;
    afterEquals = false;
    setExpression(`${formatNumber(operandA)} ${operatorSymbol(op)}`);
    setDisplay("0");
  }

  function showError() {
    setDisplay("—");
    setExpression("");
    operandA = null;
    pendingOperator = null;
    afterEquals = false;
    setFeedback("error", ERROR_MESSAGE);
  }

  function showSuccess() {
    const msg = SUCCESS_MESSAGES[successIndex % SUCCESS_MESSAGES.length];
    successIndex += 1;
    setFeedback("success", msg);
  }

  function inputEquals() {
    if (pendingOperator === null || operandA === null) {
      return;
    }

    const current = parseFloat(displayString);
    if (displayString === "—" || Number.isNaN(current)) {
      showError();
      return;
    }

    const result = applyOperator(operandA, pendingOperator, current);
    setExpression(`${formatNumber(operandA)} ${operatorSymbol(pendingOperator)} ${formatNumber(current)}`);

    if (result === null) {
      showError();
      return;
    }

    setDisplay(formatNumber(result));
    operandA = result;
    pendingOperator = null;
    afterEquals = true;
    showSuccess();
  }

  function inputClear() {
    flashDisplayClear();
    resetAll();
  }

  calcEl.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    switch (action) {
      case "digit":
        inputDigit(btn.dataset.value);
        break;
      case "operator":
        inputOperator(btn.dataset.value);
        break;
      case "equals":
        inputEquals();
        break;
      case "clear":
        inputClear();
        break;
      default:
        break;
    }
  });
})();
