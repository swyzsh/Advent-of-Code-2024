use std::fs;

fn check_safe(arr: &Vec<Vec<i32>>) -> i32 {
  println!("Puzzle Input:\n{:?}", arr);

  let mut total_safe_reports: i32 = 0;

  for (i, report) in arr.iter().enumerate() {
    let mut is_ascending: bool = true;
    let mut is_descending: bool = true;
    let mut level_safe: bool = true;

    for j in 0..report.len() - 1 {
      let diff = (report[j] - report[j + 1]).abs();

      if diff < 1 || diff > 3 {
        level_safe = false;
        break;
      }

      if report[j] < report[j + 1] {
        is_descending = false;
      } else if report[j] > report[j + 1] {
        is_ascending = false;
      }
    }

    let report_safe: bool = level_safe && (is_ascending || is_descending);
    if report_safe {
      total_safe_reports += 1;
    }

    println!(
      "Report {}:\n{:?} Check: {}",
      i + 1,
      report,
      if report_safe { "Safe" } else { "Unsafe" }
    );
  }

  return total_safe_reports;
}

fn main() {
  let file_input = fs::read_to_string("./puzzle-input.txt").expect("Failed to read the file!");
  let puzzle_input: Vec<Vec<i32>> = file_input
    .trim()
    .lines()
    .map(|line| {
      line
        .trim()
        .split_whitespace()
        .map(|num| num.parse::<i32>().expect("Failed to parse number"))
        .collect()
    })
    .collect();

  let total_safe_reports = check_safe(&puzzle_input);
  println!("Total Safe Reports: {:?}", total_safe_reports);
}
