use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Debug, Clone, PartialEq)]
pub struct Task {
    id: u32,
    text: String,
    completed: bool,
    is_suspended: bool,
    vruntime: u32,
    priority: u32,
}
