use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Debug, Clone, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Task {
    id: u32,
    text: String,
    extended_text: String,
    completed: bool,
    is_suspended: bool,
    vruntime: f64,
    priority: u32,
    weight: Option<u32>,
    tags: Option<Vec<String>>,
}
